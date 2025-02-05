/*
Keyrt með:
node basic-auth.js

Keyrir upp express vefjón sem bíður upp á að skoða leyndarmál.
Nema til að geta séð það þarf að gefa upp notandanafn og lykilorð.
*/
import express from 'express';

const app = express();

/**
 * Túlkar `authorization` header yfir í `user` og `pass`.
 * @param {object} req Request hlutur til að taka header úr
 * @returns {object} Hlutur með `user` og `pass`
 */
function parseAuthHeader(req) {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return undefined;
  }

  // Fjarlægjum "Basic " frá byrjun á header
  const token = authorization.slice(6);

  // Úr base64 yfir í <user>:<pass> streng
  const decoded = Buffer.from(token, 'base64').toString();

  // Skiptum í <user> og <pass>, bilar ef lykilorð inniheldur `:`!
  const split = decoded.split(':');

  return {
    user: split[0],
    pass: split[1],
  };
}

function basicAuthMiddleware(req, res, next) {
  const username = 'user';
  const password = 'pass';

  const { user, pass } = parseAuthHeader(req) || {};

  if (username === user && password === pass) {
    return next();
  }

  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="test"',
  });

  return res.end('401 Unauthorized');
}

app.get('/', (req, res) => {
  res.send('<a href="/secret">Leyndarmál</a>');
});

app.get('/secret', basicAuthMiddleware, (req, res) => {
  res.send('ssh! leyndarmál');
});

app.listen(3000, () => {
  console.info('Server running at http://127.0.0.1:3000');
});
