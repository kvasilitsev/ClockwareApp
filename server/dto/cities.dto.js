/**
 * City class with properties id, name
 */
 class City {
    id;
    name;
    isDeleted
/**
 * 
 * @param {integer} id
 * @param {text} cityName
 * @param {boolean} isDeleted 
 */
    constructor (id, cityName, isDeleted) {
        this.id = id;
        this.name = cityName;
        this.isDeleted = isDeleted;      
    }
}

module.exports = City;
