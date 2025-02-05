DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id serial primary key,
  title varchar(128) not null,
  text text
);

INSERT INTO items (title, text) VALUES ('færsla 1', 'texti í færslu 1');
INSERT INTO items (title, text) VALUES ('færsla 2', 'texti í færslu 2');
INSERT INTO items (title, text) VALUES ('færsla 3', 'texti í færslu 3');
INSERT INTO items (title, text) VALUES ('færsla 4', 'texti í færslu 4');
