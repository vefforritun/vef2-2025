import { readFile } from 'fs/promises';
import pg from 'pg';
import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const schemaFile = './schema.sql';

async function query(q, values = []) {
  const client = await pool.connect();

  try {
    const result = await client.query(q, values);

    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error running query');
    throw err;
  } finally {
    client.release();
  }
}

async function mock(n) {
  for (let i = 0; i < n; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const catchPhrase = faker.company.catchPhrase();

    const q = `
      INSERT INTO users (first_name, last_name, catch_phrase)
      VALUES ($1, $2, $3)`;

    await query(q, [firstName, lastName, catchPhrase]);
  }
}

async function create() {
  const data = await readFile(schemaFile);

  await query(data.toString('utf-8'));

  console.info('Schema created');

  await mock(100);

  console.info('Mock data inserted');

  await pool.end();
}

create().catch((err) => {
  console.error('Error creating schema', err);
});
