CREATE TABLE IF NOT EXISTS public.people (
  id serial primary key,
  name varchar(64) not null unique,
  text text not null,
  registered boolean not null default false,
  date timestamp with time zone not null default current_timestamp
);
