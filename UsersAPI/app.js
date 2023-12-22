import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import database from './database.js';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import  Jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import verifyJWT from "./middleware/verifyJWT.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.post('/register', async(req,res)=>{
    const {email,password} = req.body;
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    //password must be between 6 & 16 characters, must have a number and a special character (@#$%^&)
    const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    if(emailRegex.test(email) && passwordRegex.test(password)){

        const ifUserExists = await database.findUserwithEmail(email);

        if(ifUserExists && ifUserExists.email === email){
            return res.status(201).json({message:`email address already registered`});
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
      
        const hash = await bcrypt.hash(password,saltRounds);

        const date = new Date();

        const user_id = uuid();
       
        await database.createUser(user_id,email,hash,date);

        const profile_id = uuid();

        //upon sucessful registration, we need to create profile for the user as well.
        await database.createProfile(user_id, profile_id);
        //upon succesful registration, we need to send a verification email with link to the user.

        res.status(200).json({message:`Registration succesfull!`});
    } else{
        res.status(201).json({message:'Email/password not in correct format'});
    }
});

app.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    
        const ifUserExists = await database.findUserwithEmail(email);
        // match password hash
        if(ifUserExists){
            const passwordMatches = await bcrypt.compare(password, ifUserExists?.password);
            if(passwordMatches){
                //implement jwt token & send token with it and save the token to the db
                             
                const accessToken = Jwt.sign(
                    {"userEmail":ifUserExists?.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'600s'}
                );

                const refreshToken = Jwt.sign(
                    {"userEmail":ifUserExists?.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'4h'}
                )
                //save refresh token in database
                await database.updateToken(ifUserExists.id, refreshToken);
                
                //upon successful login, we need to send the profile details to the front end as well as the user details
                const profileDetails = await database.fetchProfileByUserId(ifUserExists.id);
                const user = {
                    email: ifUserExists?.email,
                    userId: ifUserExists?.id,
                    isVerfiedEmail: ifUserExists?.isVerfiedEmail,
                    profileId:profileDetails?.id,
                    displayName:profileDetails?.displayname,
                    profilePicture:profileDetails?.profilePicture,
                    description:profileDetails?.description,
                    token: accessToken
                }
                
                res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 4 * 60 * 60 * 1000});
                return res.status(200).json({result:user,message:"success"});
            } else{
                return res.status(201).json({result:[],message:`Credentials do not match`});
            }
        }
        return res.status(201).json({message:`Email not registered, please register`});
});

app.get(`/refresh`, async (req,res)=>{
    console.log('req obj',req.rawHeaders[3]);
    const cookies = req.cookies || req.rawHeaders[3].split("=")[1];
    console.log(cookies);
    if(!cookies || !cookies?.jwt) {
        return res.sendStatus(401)
    };
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt || cookies;
    const  foundUser = await database.findUserwithToken(refreshToken);
    if (!foundUser) {
        return res.sendStatus(403);
    }
    //evaluate jwt
    Jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = Jwt.sign(
                {"userEmail":ifUserExists?.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'600s'}
            );
            res.json({accessToken});
        }
    )
})

//forgot password & reset password
app.post('/forgotPassword', async(req,res)=>{
    const {email, newPassword} = req.body;
    const ifUserExists = await database.findUserwithEmail(email);
    const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    if(ifUserExists){
        if(passwordRegex.test(newPassword)){

            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const user_id = ifUserExists.id;
            const hash = await bcrypt.hash(newPassword,saltRounds);
            await database.resetPassword(hash,user_id);
            return res.json(`Password updated successfully`);
        }else{
            return res.json(`Password must have one special character & one number`)
        }
    }else{
        return res.json(`Email is not registered with us`);
    }
});

app.post('/logoff', verifyJWT, async(req,res)=>{
    const {profile_id, user_id} = req.body;
    const last_online = new Date();
    await database.deleteToken(user_id)
    await database.updateLastOnline(profile_id,user_id,last_online);
    res.clearCookie('jwt',{httpOnly:true}).json({message:'Logoff Successful'});
});

app.post('/resetPassword', async(req,res)=>{
    const {user_id, oldPassword, newPassword} = req.body;
    const findUser = await database.findUserWithId(user_id);
    if(findUser){
        if(bcrypt.compare(oldPassword, findUser.password)){
            await database.resetPassword(newPassword, user_id)
            return res.send({result:'Success', message:'Password successfully updated'})
        } else {
           return res.send({result:'Failure', message:'Incorrect old password'});
        }
    }else{
       return res.send({result:'Failure', message:'User not found'});
    }
});

app.post('/updateEmail', async(req,res)=>{
    const {email, newEmail} = req.body;
    const user = await database.findUserwithEmail(email);
    if(user){
        const user_id = user.id;
        const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        if(emailRegex.test(newEmail)){
            await database.updateEmail(newEmail,user_id);
            return res.json(`Email updated successfully`);
        }else{
            return res.json(`Email is not in correct format`);
        }
    }else{
        return res.json(`User not found`);
    }
})

//need update password route

app.post(`/deleteUser`, async(req,res)=>{
    const {email, profile_id} = req.body;
    const user = await database.findUserwithEmail(email);
    if(user){
        const user_id = user.id;
        await database.deleteUser(user_id);
        await database.deleteProfile(profile_id, user_id);
        return res.json(`User deleted successfully`);
    }else{
        return res.json(`Error Occured`);
    }
})

app.post(`/updateProfile`, async(req,res)=>{
    const {profile_id, displayName, description, user_id} = req.body;
    const profileUpdate = await database.updateDisplayNameAndDescriptionProfile(profile_id,displayName,description,user_id);
    return res.json({result:profileUpdate,message:`Profile Updated Successfully`});
})

export default app;