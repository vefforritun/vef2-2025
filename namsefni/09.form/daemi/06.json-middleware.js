/*
Keyrt með:
node 06.json-middleware.js

Keyrir upp express vefþjón á http://localhost:3000 sem tekur við JSON gögnum og
birtir þau til baka til notanda.
App notar express json middleware til að vinna úr gögnum í stað straums.
Hægt að prófa með cURL:
curl -H "Content-Type: application/json" -d '{"data": 123}' http://localhost:3000/
*/
import express from 'express';

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(`POST gögn: ${JSON.stringify(req.body)}`);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
