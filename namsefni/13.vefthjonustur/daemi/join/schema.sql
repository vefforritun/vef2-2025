
-- Þar sem við erum að nota foreign keys, verðum við að droppa töflum í réttri
-- röð, eða nota cascade, sem hendir einnig öllum tengdum færslum
DROP TABLE IF EXISTS users_books;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  category INTEGER NOT NULL,
  CONSTRAINT category FOREIGN KEY (category) REFERENCES categories (id)
);

CREATE TABLE users_books (
  id SERIAL PRIMARY KEY,
  "user" INTEGER NOT NULL,
  book INTEGER NOT NULL,
  rating INTEGER, -- Ekki takmarkað per se, en g.r.f. að sé 1 til og með 5
  CONSTRAINT book FOREIGN KEY (book) REFERENCES books (id),
  CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES users (id)
);

-- Bætum við demo gögnum

INSERT INTO categories (id, name) VALUES (1, 'Fantasy'), (2, 'Science fiction');
INSERT INTO books (id, name, category) VALUES
  (1, 'A Wizard of Earthsea', 1),
  (2, 'Assassin''s Apprentice', 1),
  (3, 'The Handmaid''s Tale', 2),
  (4, 'Parable of the Sower', 2);
INSERT INTO users (id, name) VALUES (1, 'Dr. Foo'), (2, 'Bar');
INSERT INTO users_books ("user", book, rating) VALUES
  (1, 1, 2), -- Dr. Foo hefur lesið A Wizard of Earthsea og gaf henni 2 af 5
  (1, 2, 4), -- Dr. Foo hefur lesið Assassin's Apprentice og gaf henni 4 af 5
  (1, 4, 5), -- Dr. Foo hefur lesið Parable of the Sower og gaf henni 5 af 5
  (2, 2, 3), -- Bar hefur lesið Assassin's Apprentice og gaf henni 3 af 5
  (2, 3, 4), -- Bar hefur lesið The Handmaid's Tale og gaf henni 4 af 5
  (2, 4, 5)  -- Bar hefur lesið Parable of the Sower og gaf henni 5 af 5
;
