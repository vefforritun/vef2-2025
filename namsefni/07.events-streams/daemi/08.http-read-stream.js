/*
Keyrt með:
node 08.http-read-stream.js

Keyrir upp HTTP server sem svarar á http://127.0.0.1:3000/
Streymir gögnum (ca 80MB) úr huge.txt til client.
*/
import fs from 'fs';
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  const stream = fs.createReadStream('huge.txt');
  stream.pipe(res);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server @ http://localhost:${port}/`);
});
