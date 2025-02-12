/*
Keyrt með:
node 03.xss-persistent.js

Keyrir upp express þjón með formi á /
Upplýsingar eru vistaðar í gagnagrunn án þess að strengur sé hreinsaður m.t.t.
XSS (og annars!)
Á /data eru allar færslur úr grunni sýndar og þar með möguleiki á að sýna gögn
sem innihalda XSS.
*/

import pg from 'pg';
import express from 'express';
import xss from 'xss';

const connectionString = 'postgres://vef2-user:123@localhost/vef2-sql';
const pool = new pg.Pool({ connectionString });

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Senda inn gögn, XSS hola</h2>
    <form method="post" action="/post">
      <input type="text" name="data">
      <button>Senda</button>
    </form>

    <h2>Senda inn gögn, XSS varin</h2>
    <form method="post" action="/post-safe">
      <input type="text" name="data">
      <button>Senda</button>
    </form>
    <p><a href="/data">Skoða gögn</a></p>
  `);
});

async function insert(data) {
  const client = await pool.connect();

  try {
    await client.query('INSERT INTO texts(text) VALUES ($1)', [data]);
  } catch (e) {
    console.error('Error', e);
  } finally {
    client.release();
  }
}

async function select() {
  const client = await pool.connect();

  try {
    const res = await client.query('SELECT * FROM texts');
    return res.rows;
  } catch (e) {
    console.error('Error selecting', e);
  } finally {
    client.release();
  }

  return [];
}

app.get('/data', async (req, res) => {
  const data = await select();

  // Birtum gögn úr töflu, ef þau innihalda HTML, mun það birtast „hrátt“
  res.send(`Gögn: ${data.map((i) => i.text).join('<br>')}`);
});

app.post('/post', async (req, res) => {
  const { data } = req.body;

  // XSS möguleiki!
  await insert(data);

  res.send(`
    <p>Gögn vistuð!</p>
    <p><a href="/data">Skoða gögn</a></p>
  `);
});

app.post('/post-safe', async (req, res) => {
  const { data } = req.body;

  const safeData = xss(data);
  await insert(safeData);

  res.send(`
    <p>Gögn vistuð!</p>
    <p><a href="/data">Skoða gögn</a></p>
  `);
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
