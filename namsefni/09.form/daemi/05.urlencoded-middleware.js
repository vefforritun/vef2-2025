/*
Keyrt með:
node 05.urlencoded-middleware.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með texta og skrá sem sent er með multipart/form-data á /post
App notar express urlencoded middleware til að vinna úr gögnum í stað straums.
Birtir innslegin gögn ásamt heiti á skrá.
*/
import express from 'express';

const app = express();

// Kemur í veg fyrir .on() dótið sem við gerðum í fyrri dæmum
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(/* html */ `
    <form
      method="post"
      action="/post"
      enctype="application/x-www-form-urlencoded"
    >
      <input type="text" name="data">
      <button>Senda</button>
    </form>
  `);
});

app.post('/post', (req, res) => {
  res.send(`POST gögn: ${JSON.stringify(req.body)}`);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
