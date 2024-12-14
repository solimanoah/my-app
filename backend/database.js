const { Pool } = require('pg');
require('dotenv').config();

// new connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// set correct schema
pool.on('connect', (client) => {
    client.query('SET search_path TO book_ecommerce_schema')
        .then(() => console.log('Schema set for new connection'))
        .catch((err) => console.error('Error setting schema for new connection:', err));
});

module.exports = pool;