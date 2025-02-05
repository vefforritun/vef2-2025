import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

const path = dirname(fileURLToPath(import.meta.url));

app.use('/', express.static(join(path, './public')));

const server = app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (data) => {
    console.log('received: %s', data);
    ws.send(`echo: ${data}`);
  });
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send('ping');
  });
}, 5000);

