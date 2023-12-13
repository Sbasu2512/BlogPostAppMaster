import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { uuid } from 'uuidv4';
import database from './database.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use(cors());


//a user can create posts
app.post('/posts', async(req,res)=>{
    const post_id = uuid();
    const {title,body,user_id, isPublished, is_draft} = req.body;
    const created_on = new Date();
    
    const result = await database.createPost(post_id,title,body,created_on,user_id,is_draft,isPublished);

    res.status(201).json(result);
});

//a user can see all of his/her posts
app.get('/posts/:user_id', async(req,res)=>{
    //console.log(req.params);
    const {user_id} = req.params;

    const result = await database.getAllPostByUserId(user_id);
    //console.log('result',result);
    res.status(200).json(result);
});

//a user can edit posts
app.post('/editPosts', async(req,res)=>{
    const {post_id, title, body, isPublished, is_draft, user_id} = req.body;
    const is_edited = true;
    const edited_on = Date.now();

    const result = await database.updatePost(post_id, title, body, is_draft, isPublished, is_edited, edited_on, user_id);
    res.status(201).json(result);
})

//a user can delete posts
app.post('/deletePost', async(req,res)=>{
    const {post_id, user_id} = req.body;
    await database.deletePost(post_id,user_id);
    res.json('Post deleted Successfully');
})

//a user can like a post
app.post('/likes', async(req,res)=>{
    const {post_id, user_id} = req.body;
    const like_id = uuid();
    const result = await database.createLikes(like_id,post_id,user_id);
    console.log(result);
    res.json('Post liked by user');
});

//a user can dislike a post
app.post('/dislikes', async(req,res)=>{
    const {post_id, user_id} = req.body;
    const like_id = uuid();
    const result = await database.createDislikes(like_id,post_id,user_id);
    console.log(result);
    res.json('Post disliked by user');
});


export default app;