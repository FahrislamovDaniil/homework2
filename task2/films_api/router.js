import genreController from './controllers/genre.controller.js'
import filmController from './controllers/film.controller.js'

export default async function(req, res) {
    const url = req.url.split('/');
    if (url.length < 3 || url.length > 5 || url[0] || url[1] != 'api') {
        res.writeHead(404);
        res.end();
        return;
    }
    switch(req.method) {
        case 'GET':
            switch(url[2]) {
                case 'genre':
                    if (url.length == 3) {
                        await genreController.getAllGenres(req, res);
                    } else if (url.length == 4 && isFinite(url[3])) {
                        await genreController.getGenreById(req, res, +url[3]);
                    } else if (url.length == 5 && url[3] === 'name') {
                        await genreController.getGenreByName(req, res, url[4]);
                    } else if (url.length == 5 && url[3] === 'film' && isFinite(url[4])) {
                        await genreController.getGenresByFilm(req, res, +url[4]);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                case 'film':
                    if (url.length == 3) {
                        await filmController.getAllFilms(req, res);
                    } else if (url.length == 4 && isFinite(url[3])) {
                        await filmController.getFilmById(req, res, +url[3]);
                    } else if (url.length == 5 && url[3] === 'title') {
                        await filmController.getAllFilmsByTitle(req, res, url[4]);
                    } else if (url.length == 5 && url[3] === 'year' && isFinite(url[4])) {
                        await filmController.getAllFilmsByYear(req, res, +url[4]);
                    } else if (url.length == 5 && url[3] === 'genre' && isFinite(url[4])) {
                        await filmController.getFilmsByGenre(req, res, +url[4]);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                default:
                    res.writeHead(404);
                    res.end();
                    break;
            }
            break;
        case 'POST':
            switch(url[2]) {
                case 'genre':
                    if (url.length == 3) {
                        await genreController.createGenre(req, res);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                case 'film':
                    if (url.length == 3) {
                        await filmController.createFilm(req, res);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                default:
                    res.writeHead(404);
                    res.end();
                    break;
            }
            break;
        case 'PUT':
            switch(url[2]) {
                case 'genre':
                    if (url.length == 3) {
                        await genreController.updateGenre(req, res);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                case 'film':
                    if (url.length == 3) {
                        await filmController.updateFilm(req, res);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                default:
                    res.writeHead(404);
                    res.end();
                    break;
            }
            break;
        case 'DELETE':
            switch(url[2]) {
                case 'genre':
                    if (url.length == 4 && isFinite(url[3])) {
                        await genreController.deleteGenre(req, res, +url[3]);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                case 'film':
                    if (url.length == 4 && isFinite(url[3])) {
                        await filmController.deleteFilm(req, res, +url[3]);
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                    break;
                default:
                    res.writeHead(404);
                    res.end();
                    break;
            }
            break;
        default:
            res.writeHead(404);
            res.end();
            break;
    }
}