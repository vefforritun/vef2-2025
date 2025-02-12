/*
Keyrt með:
node 05.session.js

Keyrir upp express vefjón sem notar session til að telja heimsóknir.

Notar `express-session` pakkann til að sjá um session og `connect-redis` til
að nota redis sem session store.

Ef slökkt er á server og kveikt aftur, þá haldast session upplýsingar inni,
þar sem þær eru geymdar í redis.
*/

import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const sessionSecret = 'leyndarmál';

const redisOptions = {
  url: 'redis://127.0.0.1:6379/0',
};

const client = redis.createClient(redisOptions);

const app = express();
app.use(session({
  name: 'counter.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client }),
}));

app.use((req, res, next) => {
  const { originalUrl } = req;

  if (!req.session.views) {
    req.session.views = {};
  }

  if (!req.session.views[originalUrl]) {
    req.session.views[originalUrl] = 0;
  }

  req.session.views[originalUrl] += 1;

  next();
});

function sessionCounter(req, res) {
  console.log('session', req.session);

  const { originalUrl } = req;
  const count = req.session.views[originalUrl];
  res.send(`
    <p>Þú hefur opnað ${originalUrl} ${count} sinnum</p>
    <p><a href="/">Opna /</a></p>
    <p><a href="/foo">Opna /foo</a></p>
    <p><a href="/bar">Opna /bar</a></p>
  `);
}

app.get('/', sessionCounter);
app.get('/foo', sessionCounter);
app.get('/bar', sessionCounter);

const port = 3000;

app.listen(port, () => {
  console.info(`Server running at http://127.0.0.1:${port}/`);
});
