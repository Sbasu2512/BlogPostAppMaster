import db from "./db/index.js";

const createUser = async(user_id,email,password,dateTime) => {
    const query = `INSERT INTO users (id, email, password, createdOn, isVerifiedEmail) VALUES ($1,$2, $3, $4, false) RETURNING *;`;
    const result = await db.query(query, [user_id,email,password,dateTime]);
    return result.rows[0];
}

const findUserwithEmail = async(email) => {
    const query = `SELECT * FROM users where email=$1;`;
    const result = await db.query(query, [email]);
    return result.rows[0];
}

const resetPassword = async(newPassword, user_id) => {
    const query = `UPDATE users SET password = $1 WHERE id = $2 RETURNING *;`;
    const result = await db.query(query,[newPassword, user_id]);
    return result.rows[0];
}

const updateEmail = async(newEmail, user_id) => {
    const query = `UPDATE users SET email = $1 WHERE id = $2 RETURNING *;`;
    const result = await db.query(query,[newEmail,user_id]);
    return result.rows[0];
}

const deleteUser = async(user_id) => {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    const result = await db.query(query,[user_id]);
    return result.rows[0];
}

export default {createUser, findUserwithEmail, resetPassword, deleteUser, updateEmail};