import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';

dotenv.config();

const app = express();

const { PORT: port = 3000, DATABASE_URL: connectionString = '' } = process.env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function select(search = '') {
  const client = await pool.connect();

  try {
    const q = `
      SELECT * FROM users
      WHERE
        to_tsvector('english', catch_phrase) @@ plainto_tsquery('english', $1)
        OR
        to_tsvector('english', first_name) @@ plainto_tsquery('english', $1)
        OR
        to_tsvector('english', last_name) @@ plainto_tsquery('english', $1)
    `;

    const res = await client.query(q, [search]);

    return res.rows;
  } catch (e) {
    console.error('Error selecting', e);
  } finally {
    client.release();
  }

  return [];
}

app.get('/', async (req, res) => {
  const { search } = req.query;

  const rows = await select((search ?? '')?.toString());

  res.json(rows);
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
