CREATE DATABASE filmsearch;

CREATE TABLE country
(
	country_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	country_name varchar(100) UNIQUE NOT NULL,
	
	CONSTRAINT pk_country_id PRIMARY KEY (country_id)
);

CREATE TABLE person
(
	person_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	first_name_original text,
	last_name_original text,
	picture_src text,
	height int,
	birth_date date,
	country_id int,
	spouse_person_id int,
	
	CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES country(country_id),
	CONSTRAINT fk_spouse_person_id FOREIGN KEY (spouse_person_id) REFERENCES person(person_id),
	CONSTRAINT pk_person_id PRIMARY KEY (person_id)
);

CREATE TABLE rars_restriction
(
	rars_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	rars_rating varchar(3) UNIQUE NOT NULL,
	
	CONSTRAINT pk_rars_id PRIMARY KEY (rars_id)
);

CREATE TABLE mpaa_restriction
(
	mpaa_id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	mpaa_rating varchar(5) UNIQUE NOT NULL,
	
	CONSTRAINT pk_mpaa_id PRIMARY KEY (mpaa_id)
);

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
	title_original text,
	poster_src text,
	trailer_src text,
	score decimal CHECK (score >= 0 AND score <= 10) NOT NULL,
	release_year int NOT NULL,
	country_id int NOT NULL,
	slogan text,
	director_person_id int NOT NULL,
	script_person_id int NOT NULL,
	producer_person_id int NOT NULL,
	operator_person_id int NOT NULL,
	composer_person_id int NOT NULL,
	designer_person_id int NOT NULL,
	editing_person_id int NOT NULL,
	film_budget int,
	marketing_budget int,
	box_office_usa int,
	box_office_world int NOT NULL,
	box_office_russia int,
	premiere_date_russia date,
	premiere_date_world date NOT NULL,
	premiere_date_dvd date,
	premiere_date_blueray date,
	rars_id int,
	mpaa_id int,
	film_length int NOT NULL,
	description text,
	
	CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES country(country_id),
	CONSTRAINT fk_director_person_id FOREIGN KEY (director_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_script_person_id FOREIGN KEY (script_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_producer_person_id FOREIGN KEY (producer_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_operator_person_id FOREIGN KEY (operator_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_composer_person_id FOREIGN KEY (composer_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_designer_person_id FOREIGN KEY (designer_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_editing_person_id FOREIGN KEY (editing_person_id) REFERENCES person(person_id),
	CONSTRAINT fk_rars_id FOREIGN KEY (rars_id) REFERENCES rars_restriction(rars_id),
	CONSTRAINT fk_mpaa_id FOREIGN KEY (mpaa_id) REFERENCES mpaa_restriction(mpaa_id),
	CONSTRAINT pk_film_id PRIMARY KEY (film_id)
);

CREATE TABLE film_country_views
(
	film_id int,
	country_id int,
	views_quantity int,
	
	CONSTRAINT fk_film_country_film_id FOREIGN KEY (film_id) REFERENCES film(film_id),
	CONSTRAINT fk_film_country_country_id FOREIGN KEY (country_id) REFERENCES country(country_id),
	CONSTRAINT pk_film_country_views PRIMARY KEY (film_id, country_id)
);

CREATE TABLE film_person_starring
(
	film_id int,
	person_id int,
	
	CONSTRAINT fk_starring_film_id FOREIGN KEY (film_id) REFERENCES film(film_id),
	CONSTRAINT fk_starring_person_id FOREIGN KEY (person_id) REFERENCES person(person_id),
	CONSTRAINT pk_film_person_starring PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_person_dubbed
(
	film_id int,
	person_id int,
	
	CONSTRAINT fk_dubbed_film_id FOREIGN KEY (film_id) REFERENCES film(film_id),
	CONSTRAINT fk_dubbed_person_id FOREIGN KEY (person_id) REFERENCES person(person_id),
	CONSTRAINT pk_film_person_dubbed PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_genre
(
	film_id int,
	genre_id int,
	
	CONSTRAINT fk_film_genre_film_id FOREIGN KEY (film_id) REFERENCES film(film_id),
	CONSTRAINT fk_film_genre_genre_id FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
	CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id)
);