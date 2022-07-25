/**
 * City class with properties id, name
 */
 class City {
    id;
    name;
    masterList;

/**
 * 
 * @param {integer} id
 * @param {text} cityName 
 * @param {Array} masterList 
 */
    constructor (id, cityName, masterList) {
        this.id = id;
        this.name = cityName;
        this.masterList = masterList;
    }
}

module.exports = City;