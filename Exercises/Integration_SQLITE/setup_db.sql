DROP TABLE IF EXISTS movie;


CREATE TABLE movie (
	name VARCHAR(255) NOT NULL,
	year INTEGER NOT NULL,
	director VARCHAR(255) NOT NULL,
	description VARCHAR(255)
);

INSERT INTO movie (name, year, director, description)
VALUES ("Pulp Fiction", 1996, "Quentin Tarantino", "Jules and Vincent go kill people and eat kahuna burgers.");

INSERT INTO movie (name, year, director, description)
VALUES ("Inglorious Basterds", 1996, "Quentin Tarantino", "Aldo 'the Apache' Raine scalps nazis with his crew of jews.");