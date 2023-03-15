import pg from 'pg';

const { Pool } = pg;

export default new Pool({
    user: 'postgres',
    password: '********',
    host: 'localhost',
    port: 5432,
    database: 'films'
})