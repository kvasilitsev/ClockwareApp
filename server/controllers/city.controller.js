const db = require('../db');

class CityController {
    async createCity(req, res) {
        const {name} = req.body;
        const newCity =  await db.query('INSERT INTO cities (name) values ($1) RETURNING *', [name]);
        res.json(newCity.rows);
    };
    async getCity(req, res) {
        const citiess = await db.query('SELECT * FROM cities');
        res.json(citiess.rows);
    };
    async getOneCity(req, res) {
        const id = req.params.id;
        const city = await db.query('SELECT * FROM cities where id = $1', [id]);
        res.json(city.rows);
    }; 
    async deleteCity(req, res) {
        const id = req.params.id;
        const city = await db.query('DELETE FROM cities where id = $1', [id]);
        res.json(city.rows);
    };
}


module.exports = new CityController();