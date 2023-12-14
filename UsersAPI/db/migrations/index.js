import createUsersTable from "./create_users_table.js";
import createProfilesTable from "./create_profiles_table.js";
import pg from 'pg';
import 'dotenv/config';
import PromptSync from 'prompt-sync';

const db = new pg.Pool({
  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const prompt = PromptSync();

const runDbMigrations = async () => {
  console.log('BEGIN DB MIGRATION');

  let table = prompt('What table are you migrating today? users or profiles?');

  // use single client forn transactions
  const client = await db.connect()

  try {
    await client.query('BEGIN'); // begin transaction

    switch(table){
      case 'users':
        await client.query(createUsersTable);
        break;

      case 'profiles':
        await client.query(createProfilesTable);
        break;
      
    }
    

    await client.query('COMMIT') // commit transaction

    console.log('END DB MIGRATION');

    client.end();
  } catch (e) {
    await client.query('ROLLBACK') // rollback transaction

    console.log('DB migration failed');

    throw e
  } finally {
    client.release()
  }
}

await runDbMigrations();

//export default runDbMigrations;