import * as http from 'http';
import rout from './router.js'

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
    await rout(req, res);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));