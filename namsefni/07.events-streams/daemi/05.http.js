/*
Keyrt með:
node 05.http.js

Keyrir upp HTTP server sem svarar á http://127.0.0.1:3000/ með því að skrifa
"Hello World" í response straum sem sendur er client (vafra).
*/

import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server @ http://localhost:${port}/`);
});
