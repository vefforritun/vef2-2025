/*
Keyrt með:
node 01.logging.js

Setur upp morgan HTTP request middleware og Winston logging á nokkrum atriðum
sem eru skráð í app.log, debug.log og í console
*/

import express from 'express';
import morgan from 'morgan';
import winston from 'winston';

const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'app.log' }),
    new transports.File({ filename: 'debug.log', level: 'debug' }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
  ],
});

logger.info('App started');

const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  logger.debug('Sending hello world', {
    extra: 'data',
  });
  res.send('hello, world!');
});

// dæmi um "audit logs", eitthvað sem skráir þegar breytingar á gögnum gerast
app.get('/create', (req, res) => {
  logger.info({
    action: 'create',
    id: 123,
    user: 'NN',
  });
  res.send('Bjó eitthvað til');
});

app.get('/delete', (req, res) => {
  logger.info({
    action: 'delete',
    id: 123,
    user: 'NN',
  });
  res.send('Eyddi einhverju');
});

app.get('/error', (req, res) => {
  try {
    throw new Error('Villa!');
  } catch (e) {
    logger.error(e);
  }
  res.send('villa');
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
