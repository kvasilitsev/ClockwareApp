const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class CityService {
    async getCities(req, res) {
      logger.trace("getCities()");
      const cities = await db.query('SELECT id, name FROM cities');
      res.json(cities.rows);
    }    
    async createCity(req, res) {
      logger.trace("createCity()");
      const {name} = req.body;
      const newCity =  await db.query('INSERT INTO cities (name) values ($1) RETURNING *', [name]);
      res.json(newCity.rows);
    };
    async getCityById(req, res) {
      logger.trace("getCityById()");
      const id = req.params.id;
      const city = await db.query('SELECT id, name FROM cities where id = $1', [id]);
      res.json(city.rows);
    };
    async deleteCity(req, res) {
      logger.trace("deleteCity()");
      const id = req.params.id;
      const city = await db.query('DELETE FROM cities where id = $1', [id]);
      res.json(city.rows);
    };
  }
  
  module.exports = new CityService()