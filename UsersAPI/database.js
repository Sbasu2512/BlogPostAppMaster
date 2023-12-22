import db from "./db/index.js";

const createUser = async(user_id,email,password,dateTime) => {
    const query = `INSERT INTO users (id, email, password, createdOn, isVerifiedEmail) VALUES ($1,$2, $3, $4, false) RETURNING *;`;
    const result = await db.query(query, [user_id,email,password,dateTime]);
    return result.rows[0];
}

const updateToken = async(user_id,refreshToken) => {
    const query = `UPDATE users SET token = $1 WHERE id = $2 RETURNING *;`;
    const result = await db.query(query,[refreshToken,user_id]);
    return result.rows[0];
}

const deleteToken = async(user_id) => {
    const query = `UPDATE users SET token = NULL WHERE id = $1 ;`;
    const result = await db.query(query,[user_id]);
    return result.rows[0];
}

const findUserwithEmail = async(email) => {
    const query = `SELECT * FROM users where email=$1;`;
    const result = await db.query(query, [email]);
    return result.rows[0];
}

const findUserWithId = async(id) => {
    const query = `SELECT * FROM users where id=$1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

const findUserwithToken = async(refreshToken) => {
    const query =  `SELECT * FROM users where token = $1;`;
    const result = await db.query(query, [refreshToken]);
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

const createProfile = async(user_id,profile_id) => {
    const query = `INSERT INTO profiles (id,user_id) VALUES ($1,$2) RETURNING *;`;
    const result = await db.query(query, [profile_id,user_id]);
    return result.rows[0];
}

const fetchProfileByUserId = async(user_id) => {
    const query = `SELECT * FROM profiles where user_id = $1;`;
    const result = await db.query(query, [user_id]);
    return result.rows[0];
}

const updateDisplayNameAndDescriptionProfile = async(profile_id, displayName, description, user_id) => {
    const query = `UPDATE profiles SET displayName = $1, description = $2 WHERE id = $3 and user_id = $4 RETURNING *;`;
    const result = await db.query(query, [displayName,description, profile_id, user_id]);
    return result.rows[0];
}

const updateLastOnline = async(profile_id,user_id,last_online) => {
    const query = `UPDATE profiles SET last_online = $1 WHERE id = $2 and user_id = $3 RETURNING *;`;
    const result = await db.query(query, [last_online, profile_id, user_id]);
    return result.rows[0];
}

const deleteProfile = async(profile_id, user_id) => {
    const query = `DELETE FROM profiles WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const result = await db.query(query,[profile_id,user_id]);
    return result.rows[0];
}

export default {
    createUser, 
    findUserwithEmail, 
    resetPassword, 
    deleteUser, 
    updateEmail, 
    createProfile, 
    updateDisplayNameAndDescriptionProfile,
    updateLastOnline,
    deleteProfile,
    fetchProfileByUserId,
    updateToken,
    deleteToken,
    findUserwithToken,
    findUserWithId
};