import dotenv from 'dotenv';
import express from 'express';

import { router as apiRouter } from './api.js';

dotenv.config();

const { PORT: port = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(apiRouter);

// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  console.warn('Not found', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if ('status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://127.0.0.1:${port}/`);
});
