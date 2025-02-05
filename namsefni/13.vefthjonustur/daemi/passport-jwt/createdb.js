import { readFile } from 'fs/promises';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const schemaFile = './schema.sql';

async function query(q) {
  const client = await pool.connect();

  try {
    const result = await client.query(q);

    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error running query');
    throw err;
  } finally {
    client.release();
  }
}

async function create() {
  const data = await readFile(schemaFile);

  try {
    await query(data.toString('utf-8'));
    console.info('Schema created');
  } catch (e) {
    console.error('Error creating schema', e);
  } finally {
    pool.end();
  }
}

create().catch((err) => {
  console.error('Error creating schema', err);
});
