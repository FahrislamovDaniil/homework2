import * as filmRepo from '../repos/film.repo.js'

export default {

    // @end_point   GET /api/film
    async getAllFilms(req, res) {
        try {
            const films = await filmRepo.findAllFilms();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(films));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/film/:id
    async getFilmById(req, res, id) {
        try {
            const film = await filmRepo.findFilmById(id);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(film));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/film/title/:title
    async getAllFilmsByTitle(req, res, title) {
        try {
            const films = await filmRepo.findAllFilmsByTitle(title);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(films));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/film/year/:year
    async getAllFilmsByYear(req, res, year) {
        try {
            const films = await filmRepo.findAllFilmsByYear(year);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(films));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   GET /api/film/genre/:genreId
    async getFilmsByGenre(req, res, genreId) {
        try {
            const films = await filmRepo.findFilmsByGenre(genreId);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(films));
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    },
    
    // @end_point   POST /api/film
    async createFilm(req, res) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            if(body) {
                req.body = JSON.parse(body);
            }

            try {
                const film = await filmRepo.createFilm(req.body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(film));
            } catch(error) {
                console.log(error);
                res.writeHead(500);
                res.end();
            }
        });
    },
    
    // @end_point   PUT /api/film
    async updateFilm(req, res) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            if(body) {
                req.body = JSON.parse(body);
            }

            try {
                const film = await filmRepo.updateFilm(req.body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(film));
            } catch(error) {
                console.log(error);
                res.writeHead(500);
                res.end();
            }
        });
    },
    
    // @end_point   DELETE /api/film/:id
    async deleteFilm(req, res, id) {
        try {
            await filmRepo.deleteFilm(id);

            res.writeHead(200);
            res.end();
        } catch(error) {
            console.log(error);
            res.writeHead(500);
            res.end();
        }
    }
}