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
       
        const result = await database.createUser(user_id,email,hash,date);
        res.status(201).json(`Registration succesfull!`);
    } else{
        res.send('Email/password not in correct format');
    }
});

app.post('/login', async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    
        const ifUserExists = await database.findUserwithEmail(email);
        // match password hash
        const passwordMatches = await bcrypt.compare(password, ifUserExists.password);
        if(passwordMatches){
            console.log(ifUserExists);
            const user = {
                email: ifUserExists.email,
                id: ifUserExists.id,
                isVerfiedEmail: ifUserExists.isVerfiedEmail
            }
            //implement jwt token & send token with it and save the token to the db
            
          return res.json(user);
        } else{
            return res.json(`Credentials do not match`);
        }
        
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
    const {email} = req.body;
    const user = await database.findUserwithEmail(email);
    if(user){
        const user_id = user.id;
        await database.deleteUser(user_id);
        return res.json(`User deleted successfully`);
    }else{
        return res.json(`Error Occured`);
    }
})


export default app;