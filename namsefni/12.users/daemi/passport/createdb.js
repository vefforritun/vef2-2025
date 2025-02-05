import { readFile } from 'fs/promises';
import { end, query } from './db.js';

const schemaFile = './schema.sql';

async function create() {
  const data = await readFile(schemaFile);

  try {
    await query(data.toString('utf-8'));
    console.info('Schema created');
  } catch (e) {
    console.error('Error creating schema', e);
  }

  await end();
}

create().catch((err) => {
  console.error('Error creating schema', err);
});
