import * as genreRepo from '../repos/genre.repo.js'

export default {

    // @end_point   GET /api/genre
    async getAllGenres(req, res) {
        try {
            const genres = await genreRepo.findAllGenres();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(genres));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },

    // @end_point   GET /api/genre/:id
    async getGenreById(req, res, id) {
        try {
            const genre = await genreRepo.findGenreById(id);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(genre));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/genre/name/:name
    async getGenreByName(req, res, name) {
        try {
            const genre = await genreRepo.findGenreByName(name);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(genre));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/genre/film/:film
    async getGenresByFilm(req, res, film_id) {
        try {
            const genres = await genreRepo.findGenresByFilm(film_id);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(genres));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },

    // @end_point   POST /api/genre
    async createGenre(req, res) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            if(body) {
                req.body = JSON.parse(body);
            }

            try {
                const genre = await genreRepo.createGenre(req.body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(genre));
            } catch(error) {
                console.log(error);
                res.writeHead(500);
                res.end();
            }
        });
    },
    
    // @end_point   PUT /api/genre
    async updateGenre(req, res) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            if(body) {
                req.body = JSON.parse(body);
            }

            try {
                const genre = await genreRepo.updateGenre(req.body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(genre));
            } catch(error) {
                console.log(error);
                res.writeHead(500);
                res.end();
            }
        });
    },
    
    // @end_point   DELETE /api/genre/:id
    async deleteGenre(req, res, id) {
        try {
            await genreRepo.deleteGenre(id);

            res.writeHead(200);
            res.end();
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    }
}