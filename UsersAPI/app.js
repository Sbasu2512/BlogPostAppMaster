import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import database from './database.js';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

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
            return res.status(201).json(`email address already registered`);
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
      
        const hash = await bcrypt.hash(password,saltRounds);

        const date = new Date();

        const user_id = uuid();
       
        const userCreation = await database.createUser(user_id,email,hash,date);

        const profile_id = uuid();

        //upon sucessful registration, we need to create profile for the user as well.
        const profileCreation = await database.createProfile(user_id, profile_id);
        //upon succesful registration, we need to send a verification email with link to the user.

        res.status(201).json(`Registration succesfull!`);
    } else{
        res.send('Email/password not in correct format');
    }
});

// {
//     id: 'b11cd045-eb2b-43b6-9707-bee7229e639c',
//     email: 'xyz@gmail.com',
//     password: '$2b$12$/S77lOlykK/5Oo/JnhJMCeve4rnLr1BA52KUani5kYVcr8r.CpvZC',
//     createdon: 2023-12-13T18:30:00.000Z,
//     isverifiedemail: false,
//     token: null
//   }
//   {
//     id: 'c9fa80a3-30fe-43ef-80f2-ebdebe46264d',
//     displayname: null,
//     profilepicture: null,
//     description: null,
//     user_id: 'b11cd045-eb2b-43b6-9707-bee7229e639c',
//     last_online: null
//   }

app.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    
        const ifUserExists = await database.findUserwithEmail(email);
        // match password hash
        const passwordMatches = await bcrypt.compare(password, ifUserExists.password);
        if(passwordMatches){
            //upon successful login, we need to send the profile details to the front end as well as the user details
            const profileDetails = await database.fetchProfileByUserId(ifUserExists.id);
            const user = {
                email: ifUserExists?.email,
                userId: ifUserExists?.id,
                isVerfiedEmail: ifUserExists?.isVerfiedEmail,
                profileId:profileDetails?.id,
                displayName:profileDetails?.displayName,
                profilePicture:profileDetails?.profilePicture,
                description:profileDetails?.description
            }
            //implement jwt token & send token with it and save the token to the db
            
          return res.json(user);
        } else{
            return res.json(`Credentials do not match`);
        }
});

app.post('/logoff', async(req,res)=>{
    const {last_online,profile_id, user_id} = req.body;
    await db.updateLastOnline(profile_id,user_id,last_online);
    res.json('Logoff Successful');
});

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


export default app;