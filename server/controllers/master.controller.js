const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class MasterController {
    async createMaster(req, res) {
        logger.trace("createMaster()");
        const {name, rating, city_id} = req.body;
        const newMaster =  await db.query('INSERT INTO masters (name, rating, city_id) values ($1, $2, $3) RETURNING *', [name, rating, city_id]);
        res.json(newMaster.rows);
    };
    async getMasters(req, res) {
        logger.trace("getMasters()");
        const masters = await db.query('SELECT * FROM masters');
        res.json(masters.rows);
    };
    async getOneMaster(req, res) {
        logger.trace("getOneMaster()");
        const id = req.params.id;
        const master = await db.query('SELECT * FROM masters where id = $1', [id]);
        res.json(master.rows);
    };
    async updateMaster(req, res) {
        logger.trace("updateMaster()");
        const {id, name, rating, city_id} = req.body;
        const master = await db.query('UPDATE masters SET name = $1, rating =$2, city_id = $3 WHERE id = $4 RETURNING *', [name, rating, city_id, id]);
        res.json(master.rows);
    };
    async deleteMaster(req, res) {
        logger.trace("deleteMaster()");
        const id = req.params.id;
        const master = await db.query('DELETE FROM masters where id = $1', [id]);
        res.json(master.rows);
    };
    async getMasterByCity(req, res) {
        logger.trace("getMasterByCity()");
        const id = req.query.id;
        const masters = await db.query('SELECT name, rating, id, city_id FROM masters where city_id = $1', [id]);
        masters.rows.forEach(element => {
            logger.info("master name: "+element.name + ", master rating: "+element.rating);
        });
        res.json(masters.rows);
    };
}


module.exports = new MasterController();
