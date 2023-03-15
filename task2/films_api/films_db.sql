CREATE DATABASE films;

CREATE TABLE genre
(
	genre_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	genre_name text UNIQUE NOT NULL,
	
	CONSTRAINT pk_genre_id PRIMARY KEY (genre_id)
);

CREATE TABLE film
(
	film_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	title text NOT NULL,
	release_year int NOT NULL,
	
	CONSTRAINT pk_film_id PRIMARY KEY (film_id)
);

CREATE TABLE film_genre
(
	film_id int,
	genre_id int,
	
	CONSTRAINT fk_film_genre_film_id FOREIGN KEY (film_id) REFERENCES film(film_id),
	CONSTRAINT fk_film_genre_genre_id FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
	CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id)
);