/*
Keyrt með:
node 07.http-read-file.js

Keyrir upp HTTP server sem svarar á http://127.0.0.1:3000/
Les gögn (ca 80MB) úr huge.txt fyrst í minni og sendir síðan til client.
*/
import fs from 'fs';
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  fs.readFile('huge.txt', (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server @ http://localhost:${port}/`);
});
