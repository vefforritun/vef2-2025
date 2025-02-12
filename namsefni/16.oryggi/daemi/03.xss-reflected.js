/*
Keyrt með:
node 02.xss-reflected.js

Keyrir upp express þjón með tveim formum á /
Bæði sýna notanda þau gögn sem voru send, með `post` og `get` sem opnar á
möguleika á reflected xss.
Rétt útfærsla sýnd í /get-safe og /post-safe
*/
import express from 'express';
import xss from 'xss';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
<h2>GET með XSS holu</h2>
<form method="get" action="/get">
  <input type="text" name="data">
  <button>Senda</button>
</form>
<h2>POST með XSS holu</h2>
<form method="post" action="/post">
  <input type="text" name="data">
  <button>Senda</button>
</form>
<hr>
<h2>GET án XSS holu</h2>
<form method="get" action="/get-safe">
  <input type="text" name="data">
  <button>Senda</button>
</form>
<h2>POST án XSS holu</h2>
<form method="post" action="/post-safe">
  <input type="text" name="data">
  <button>Senda</button>
</form>
  `);
});

app.get('/get', (req, res) => {
  const { data } = req.query;

  // XSS möguleiki!
  res.send(`Þú sendir: ${data}`);
});

app.get('/get-safe', (req, res) => {
  const { data } = req.query;

  const safeData = xss(data);

  res.send(`Þú sendir: ${safeData}`);
});

app.post('/post', (req, res) => {
  const { data } = req.body;

  // XSS möguleiki!
  res.send(`Þú sendir: ${data}`);
});

app.post('/post-safe', (req, res) => {
  const { data } = req.body;

  const safeData = xss(data);

  res.send(`Þú sendir: ${safeData}`);
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
