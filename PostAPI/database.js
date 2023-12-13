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

const getAllPostByUserId = async(user_id)=>{
    const query = `SELECT * FROM posts WHERE user_id=$1;`;
    const result = await db.query(query,[user_id]);
    return result.rows;
}

const updatePost = async(post_id,post_title,post_body,is_draft,isPublished,is_edited,edited_on, user_id)=>{
    const query = `UPDATE posts SET post_title = $1, post_body = $2, is_draft = $3, is_published = $4, is_edited = $5, edited_on = $6
    WHERE id = $7 and user_id = $8 RETURNING *;`;
    const result = await db.query(query,[post_title,post_body,is_draft,isPublished,is_edited,edited_on,post_id, user_id]);
    return result.rows[0];
}

const deletePost = async(post_id, user_id)=>{
    const query = `DELETE FROM posts WHERE id=$1 AND user_id=$2;`;
    const result = await db.query(query,[post_id,user_id]);
    return result.rows[0];
}

export default {createPost,getAllPostByUserId, updatePost, deletePost};