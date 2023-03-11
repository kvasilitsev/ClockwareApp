/**
 * City class with properties id, name
 */
 class City {
    id;
    name;
/**
 * 
 * @param {integer} id
 * @param {text} cityName 
 */
    constructor (id, cityName) {
        this.id = id;
        this.name = cityName;        
    }
}

module.exports = City;