import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import database from './database.js';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import  Jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import verifyJWT from "./middleware/verifyJWT.js"
import ResponseModel from './models/ResponseModel.js';
import {ResponseStatus} from './models/enum.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// var whitelist = ['http://localhost:3000'] //only allowing localhost:3000 to access this endpoint
// var corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors());
app.use(cookieParser());

app.post('/register', async(req,res)=>{
    try{
        const {email,password} = req.body;
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    //password must be between 6 & 16 characters, must have a number and a special character (@#$%^&)
    const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    if(emailRegex.test(email) && passwordRegex.test(password)){

        const ifUserExists = await database.findUserwithEmail(email);

        if(ifUserExists && ifUserExists.email === email){
            const response = new ResponseModel(null,'email address already registered',ResponseStatus.SUCCESS)
            return res.status(201).json(response);
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
        const response = new ResponseModel(null,'Registration succesfull!',ResponseStatus.SUCCESS)
        res.status(200).json(response);
    } else{
        const response = new ResponseModel(null,'Email/password not in correct format',ResponseStatus.SUCCESS)
        res.status(201).json(response);
    }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
    
});

app.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
    
        const ifUserExists = await database.findUserwithEmail(email);
        // match password hash
        if(ifUserExists){
            const passwordMatches = await bcrypt.compare(password, ifUserExists?.password);
            if(passwordMatches){
                //implement jwt token & send token with it and save the token to the db
                             
                const accessToken = Jwt.sign(
                    {"userId":ifUserExists?.id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'600s'}
                );

                const refreshToken = Jwt.sign(
                    {"userId":ifUserExists?.id},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'4h'}
                )
                //save refresh token in database
                await database.updateToken(ifUserExists.id, refreshToken);
                
                //upon successful login, we need to send the profile details to the front end as well as the user details
                const token = {
                    token: accessToken,
                    userId: ifUserExists.id
                }
                res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 4 * 60 * 60 * 1000});
                const response = new ResponseModel(token,ResponseStatus.SUCCESS,true)
                return res.status(200).json(response);
            } else{
                const response = new ResponseModel("Unsuccessfull",'Credentials do not match',ResponseStatus.SUCCESS)
                return res.status(201).json(response);
            }
        }
        const response = new ResponseModel("Unsuccessfull",'Email not registered, please register',ResponseStatus.SUCCESS,)
        return res.status(201).json(response);
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
});

app.get(`/refresh`, async (req,res)=>{
    try{
        const cookies = req.cookies;
        if(!cookies?.jwt) {
            return res.status(401);
        };   
        const refreshToken = cookies.jwt ;
        const  foundUser = await database.findUserwithToken(refreshToken);
        if (!foundUser) {
            const response = new ResponseModel(null,'User not found',ResponseStatus.SUCCESS)
            return res.status(403).json(response);
        }
        //evaluate jwt
        Jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err || foundUser.id !== decoded.userId){ 
                    const response = new ResponseModel(null,'Could not verify user',ResponseStatus.SUCCESS)
                    return res.status(403).json(response);
                }
                const accessToken = Jwt.sign(
                    {"userId":foundUser?.id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'600s'}
                );
                const response = new ResponseModel(accessToken,"Access Token Issued",ResponseStatus.SUCCESS)
               return res.json(response);
            }
        )
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
    
})

//forgot password & reset password
app.post('/forgotPassword', async(req,res)=>{
    try{
        const {email, newPassword} = req.body;
        const ifUserExists = await database.findUserwithEmail(email);
        const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
        if(ifUserExists){
            if(passwordRegex.test(newPassword)){
    
                const saltRounds = parseInt(process.env.SALT_ROUNDS);
                const user_id = ifUserExists.id;
                const hash = await bcrypt.hash(newPassword,saltRounds);
                await database.resetPassword(hash,user_id);
                const response = new ResponseModel(null,`Password updated successfully`,ResponseStatus.SUCCESS)
                return res.json(response);
            }else{
                const response = new ResponseModel(null,`Password must have one special character & one number`,ResponseStatus.SUCCESS,true)
                return res.json(response)
            }
        }else{
            const response = new ResponseModel(null,`Email is not registered with us`,ResponseStatus.SUCCESS)
            return res.json(response);
        }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
    
});

app.post('/logoff',verifyJWT, async(req,res)=>{
    try{
        const {profile_id, user_id} = req.body;
        if(!profile_id || !user_id){
            const response = new ResponseModel(null,`Log off unsucessful`,ResponseStatus.SUCCESS)
            return res.json(response);
        }
        const last_online = new Date();
        await database.deleteToken(user_id)
        await database.updateLastOnline(profile_id,user_id,last_online);
        res.clearCookie('jwt',{httpOnly:true})
        const response = new ResponseModel(null,`Logoff Successful`,ResponseStatus.SUCCESS)
        return res.json(response);
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
   
});

app.post('/resetPassword', async(req,res)=>{
    try{
        const {user_id, oldPassword, newPassword} = req.body;
    const findUser = await database.findUserWithId(user_id);
    if(findUser){
        if(bcrypt.compare(oldPassword, findUser.password)){
            await database.resetPassword(newPassword, user_id)
            const response = new ResponseModel(null,`Password successfully updated`,ResponseStatus.SUCCESS)
            return res.send(response)
        } else {
           const response = new ResponseModel(null,`Incorrect old password`,ResponseStatus.SUCCESS)
            return res.send(response);
        }
    }else{
       const response = new ResponseModel(null,`User not found`,ResponseStatus.SUCCESS)
        return res.send(response);
    }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
    
});

app.post('/updateEmail', async(req,res)=>{
    try{
        const {email, newEmail} = req.body;
        const user = await database.findUserwithEmail(email);
        if(user){
            const user_id = user.id;
            const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
            if(emailRegex.test(newEmail)){
                await database.updateEmail(newEmail,user_id);
                const response = new ResponseModel(null,`Email updated successfully`,ResponseStatus.SUCCESS)
                return res.json(response);
            }else{
                const response = new ResponseModel(null,`Invalid Email`,ResponseStatus.SUCCESS)
                return res.json(response);
            }
        }else{
            const response = new ResponseModel(null,`User not found`,ResponseStatus.SUCCESS)
            return res.json(response);
        }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
   
})

//need update password route
app.post(`/deleteUser`, async(req,res)=>{
    try{
        const {email, profile_id} = req.body;
    const user = await database.findUserwithEmail(email);
    if(user){
        const user_id = user.id;
        await database.deleteUser(user_id);
        await database.deleteProfile(profile_id, user_id);
        const response = new ResponseModel(null,'User deleted successfully',ResponseStatus.SUCCESS)
        return res.json(response);
    }else{
        const response = new ResponseModel(null,'User not found',ResponseStatus.SUCCESS)
        return res.json(response);
    }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
})

app.post(`/updateProfile`, async(req,res)=>{
    try{
        const {profile_id, displayName, description, user_id} = req.body;
        const profileUpdate = await database.updateDisplayNameAndDescriptionProfile(profile_id,displayName,description,user_id);
        const response = new ResponseModel(profileUpdate,'Profile Updated Successfully',ResponseStatus.SUCCESS)
        return res.json(response);
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
})

app.get(`/getUserDetails/:id`,verifyJWT, async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            const response = new ResponseModel(null,'Not valid user id',ResponseStatus.SUCCESS)
           return res.status(200).json(response)
        }
        const user = await database.findUserWithId(id);
        const profile = await database.fetchProfileByUserId(id);
        if(!user){
            const response = new ResponseModel(null,'user not found',ResponseStatus.SUCCESS)
            return res.status(200).json(response)
        }else{
            const mappedUser = {
                id:  user.id,
                email: user.email,
                createdon: user.createdon,
                isverifiedemail:user.isverifiedemail,
                displayName: profile.displayname,
                profilePicture: profile.profilepicture,
                description:profile.description,
                last_online:profile.last_online,
                profileId:profile.id
            }
            const response = new ResponseModel(mappedUser,'User found',ResponseStatus.SUCCESS)
            return res.status(200).json(response)
        }
    }catch(e){
        const response = new ResponseModel(e,`Error encountered`,ResponseStatus.FAIL)
        return res.status(200).json(response);
    }
})

export default app;