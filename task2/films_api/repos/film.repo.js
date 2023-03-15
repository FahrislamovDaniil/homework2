import db from '../db.js';
import { findGenresByFilm } from './genre.repo.js';

export async function findAllFilms() {
    const films = await db.query('SELECT * FROM film');
    let result = films.rows.concat();
    for (let i = 0; i < result.length; i++) {
        result[i].genres = await findGenresByFilm(result[i].film_id);
    }
    return result;
}

export async function findFilmById(id) {
    const film = await db.query(
        'SELECT * FROM film WHERE film_id = $1',
        [id]
    );
    let result = film.rows.concat();
    if (result[0]) {
        result[0].genres = await findGenresByFilm(result[0].film_id);
    }
    return result[0] || null;
}

export async function findAllFilmsByTitle(title) {
    const films = await db.query(
        'SELECT * FROM film WHERE title = $1',
        [title]
    );
    let result = films.rows.concat();
    for (let i = 0; i < result.length; i++) {
        result[i].genres = await findGenresByFilm(result[i].film_id);
    }
    return result;
}

export async function findAllFilmsByYear(year) {
    const films = await db.query(
        'SELECT * FROM film WHERE release_year = $1',
        [year]
    );
    let result = films.rows.concat();
    for (let i = 0; i < result.length; i++) {
        result[i].genres = await findGenresByFilm(result[i].film_id);
    }
    return result;
}

export async function findFilmsByGenre(genreId) {
    const films = await db.query(
        'SELECT * FROM film WHERE film_id IN (SELECT film_id FROM film_genre WHERE genre_id = $1)',
        [genreId]
    );
    let result = films.rows.concat();

    for (let i = 0; i < result.length; i++) {
        result[i].genres = await findGenresByFilm(result[i].film_id);
    }
    return result;
}

export async function createFilm(film) {
    const { title, release_year, genresId } = film;
    if (!title || !release_year || !genresId) {
        return null;
    }
    const filmId = await db.query(
        'INSERT INTO film (title, release_year) VALUES ($1, $2) RETURNING film_id',
        [title, release_year]
    );
    
    genresId.forEach(async genreId => {
        await db.query(
            'INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)',
            [filmId.rows[0].film_id, genreId]
        );
    });
    const genres = await findGenresByFilm(filmId.rows[0].film_id);
    return { ...filmId.rows[0], title: title, release_year: release_year, genres: genres };
}

export async function updateFilm(film) {
    const { film_id, title, release_year, genresId } = film;
    if (!film_id || !title || !release_year || !genresId) {
        return null;
    }
    const updatedFilm = await db.query(
        'UPDATE film SET title = $1, release_year = $2 WHERE film_id = $3 RETURNING *',
        [title, release_year, film_id]
    );
    let result = updatedFilm.rows.concat();
    if(!result[0]) {
        return null;
    }

    await db.query(
        'DELETE FROM film_genre WHERE film_id = $1',
        [film_id]
    );
    genresId.forEach(async genreId => {
        await db.query(
            'INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)',
            [film_id, genreId]
        );
    });

    result[0].genres = await findGenresByFilm(film_id);
    return result[0];
}

export async function deleteFilm(id) {
    await db.query(
        'DELETE FROM film_genre WHERE film_id = $1',
        [id]
    );
    await db.query(
        'DELETE FROM film WHERE film_id = $1',
        [id]
    );
}