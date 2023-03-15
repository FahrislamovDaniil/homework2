import db from '../db.js';

export async function findAllGenres() {
    const genres = await db.query('SELECT * FROM genre');
    return genres.rows;
}

export async function findGenreById(id) {
    const genre = await db.query(
        'SELECT * FROM genre WHERE genre_id = $1',
        [id]
    );
    return genre.rows[0] || null;
}

export async function findGenreByName(name) {
    const genre = await db.query(
        'SELECT * FROM genre WHERE genre_name = $1',
        [name]
    );
    return genre.rows[0] || null;
}

export async function findGenresByFilm(film_id) {
    const genres = await db.query(
        'SELECT * FROM genre WHERE genre_id IN (SELECT genre_id FROM film_genre WHERE film_id = $1)',
        [film_id]
    );
    return genres.rows;
}

export async function createGenre(genre) {
    const { genre_name } = genre;
    if (!genre_name) {
        return null;
    }
    const genreId = await db.query(
        'INSERT INTO genre (genre_name) VALUES ($1) RETURNING genre_id',
        [genre_name]
    );
    return { ...genreId.rows[0], genre_name: genre_name };
}

export async function updateGenre(genre) {
    const { genre_id, genre_name } = genre;
    if (!genre_id || !genre_name) {
        return null;
    }
    const updatedGenre = await db.query(
        'UPDATE genre SET genre_name = $1 WHERE genre_id = $2 RETURNING *',
        [genre_name, genre_id]
    );
    return updatedGenre.rows[0] || null;
}

export async function deleteGenre(id) {
    await db.query(
        'DELETE FROM film_genre WHERE genre_id = $1',
        [id]
    );
    await db.query(
        'DELETE FROM genre WHERE genre_id = $1',
        [id]
    );
}