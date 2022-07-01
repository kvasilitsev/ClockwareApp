const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'Pulsar123',
    host: 'localhost',
    port: 5432,
    database: 'clockwise_db'
});



module.exports = pool;
