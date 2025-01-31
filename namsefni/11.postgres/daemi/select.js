import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_URL: connectionString = 'postgres://:@localhost/vef2',
} = process.env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('postgres error, exiting...', err);
  process.exit(-1);
});

async function main() {
  let client;

  try {
    client = await pool.connect();
  } catch (e) {
    console.error('Unable to connect', e);
    return;
  }

  try {
    const result = await client.query('SELECT * FROM people');
    console.log(result);
  } catch (e) {
    console.error('Error selecting', e);
  } finally {
    client.release();
  }

  await pool.end();
}

main().catch((e) => { console.error(e); });
