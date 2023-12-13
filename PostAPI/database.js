import db from "./db/index.js";
// id uuid PRIMARY KEY,
//     post_title VARCHAR(255) NOT NULL,
//     post_body VARCHAR(255),
//     createdOn Date NOT NULL,
//     is_draft boolean NOT NULL,
//     is_published boolean NOT NULL,
//     is_edited boolean,
//     edited_on Date,
//     user_id uuid REFERENCES users(id) ON DELETE CASCADE

const createPost = async(post_id,post_title,post_body,created_on,user_id,is_draft,isPublished)=>{
    const query = `INSERT INTO posts (id, post_title, post_body, createdon, is_draft, is_published, user_id) 
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
    const result = await db.query(query,[post_id,post_title,post_body,created_on,is_draft,isPublished,user_id]);
    return result.rows[0];
};

const getPostByUserId = async(user_id)=>{
    const query = `SELECT * FROM posts WHERE user_id=$1;`;
    const result = await db.query(query,[user_id]);
    return result.rows;
}

export default {createPost,getPostByUserId};