/*
Keyrt með:
node 01.get.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form sem sent er með GET á /get þar sem gögn úr formi eru birt.
*/
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(/* html */ `
    <form method="get" action="/get">
      <input type="text" name="data">
      <button>Senda</button>
    </form>
  `);
});

app.get('/get', (req, res) => {
  res.send(`GET gögn: ${req.query.data}`);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
