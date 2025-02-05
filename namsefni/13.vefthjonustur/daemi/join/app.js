/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const {
  PORT: port = 3000,
  DATABASE_URL: connectionString = '',
} = process.env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function query(q, values = []) {
  const client = await pool.connect();

  try {
    const res = await client.query(q, values);

    return res.rows;
  } catch (e) {
    console.error('Error querying', e);
  } finally {
    client.release();
  }

  return null;
}

// Skilum beint úr lambda falli svo engir { }
app.get('/', async (req, res) => res.json({
  users: '/users',
  books: '/books',
  categories: '/categories',
}));

// Hér er villumeðhöndlun viljandi sleppt til að stytta dæmi
app.get('/categories', async (req, res) => {
  const categories = await query(`
    SELECT id, name FROM categories;
  `);

  const categoriesWithLinks = categories.map((category) => {
    category._links = {
      self: `/categories/${category.id}`,
    };
    return category;
  });

  return res.json(categoriesWithLinks);
});

app.get('/categories/:id', async (req, res) => {
  const category = await query(`
    SELECT id, name FROM categories WHERE id = $1;
  `, [req.params.id]);

  const books = await query(`
    SELECT id, name FROM books WHERE category = $1
  `, [req.params.id]);

  const booksWithLinks = books.map((book) => {
    book._links = {
      self: `/books/${book.id}`,
    };
    return book;
  });

  return res.json({
    category,
    books: booksWithLinks,
  });
});

app.get('/books', async (req, res) => {
  const books = await query(`
    SELECT id, name FROM books;
  `);

  const booksWithLinks = books.map((book) => {
    book._links = {
      self: `/books/${book.id}`,
    };
    return book;
  });

  return res.json(booksWithLinks);
});

app.get('/books/:id', async (req, res) => {
  const book = await query(`
    SELECT
      books.id AS id, books.name AS name, categories.name AS category
    FROM
      books
    JOIN
      categories ON books.category = categories.id
    WHERE
      books.id = $1;
  `, [req.params.id]);

  // Hér erum við með "n+1" query, í staðinn fyrir að sækja alla lesendur í einu
  // eins og er commentað út, þá sækjum við fyrst allar færslur úr tengitöflu
  // síðan framkvæmum við n fyrirspurnir eftir lesendum.
  const readers = [];

  const usersBooks = await query(
    // ATH user er frátekið orð í postgres svo við verðum að setja innan ""
    'SELECT "user" FROM users_books WHERE book = $1 ', [req.params.id],
  );

  await Promise.all(usersBooks.map(async (userBooks) => {
    const reader = await query(
      'SELECT id, name FROM users WHERE id = $1',
      [userBooks.user],
    );

    readers.push(reader[0]);
  }));

  // Svona ætti þetta að vera, notum JOIN til að sækja strax alla lesendur
  /*
  const readers = await query(`
    SELECT
      users.id AS id, users.name AS name, users_books.rating AS rating
    FROM
      users_books
    JOIN
      users ON users_books.user = users.id
    WHERE book = $1;
  `, [req.params.id]);
  */

  return res.json({
    book,
    readers,
  });
});

app.get('/users', async (req, res) => {
  const users = await query(`
    SELECT id, name FROM users;
  `);

  const usersWithLinks = users.map((user) => {
    user._links = {
      self: `/users/${user.id}`,
    };
    return user;
  });

  return res.json(usersWithLinks);
});

app.get('/users/:id', async (req, res) => {
  const user = await query(`
    SELECT
      users.id AS id, users.name AS name,
      -- Hér notum við "aggregate" fall til þess að fá meðaltal af öllum
      -- rating sem notandi hefur gefið, námundað að tveim aukastöfum
      ROUND(AVG(users_books.rating), 2) as averageRating
    FROM
      users
    JOIN
      users_books ON users_books.user = users.id
    WHERE
      users.id = $1
    -- Verðum að "hópa eftir" user.id til þess að aggregate fall virki
    GROUP BY users.id;
  `, [req.params.id]);

  const booksForUser = await query(`
    SELECT
      books.id AS id, books.name AS name, users_books.rating AS rating
    FROM
      users_books
    JOIN
      books ON users_books.book = books.id
    WHERE
      users_books.user = $1
    -- Röðum þ.a. bækur með hæsta rating komi fyrst
    ORDER BY
      users_books.rating DESC
  `, [req.params.id]);

  const booksForUserWithLinks = booksForUser.map((book) => {
    book._links = {
      self: `/books/${book.id}`,
    };
    return book;
  });

  return res.json({
    user,
    books: booksForUserWithLinks,
  });
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
