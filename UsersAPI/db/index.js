import pg from 'pg'

const db = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER|| 'sayan',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'blogpostapp_users',
});

export default db;