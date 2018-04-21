CREATE TABLE users (
	id serial PRIMARY KEY,
	name varchar(100),
	email text UNIQUE NOT NULL,
	entries bigint DEFAULT 0,
	joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
	id serial PRIMARY KEY,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
);