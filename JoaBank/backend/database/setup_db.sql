DROP TABLE IF EXISTS user;

CREATE TABLE user(
	email VARCHAR(255) UNIQUE,
	balance DECIMAL(255)

);