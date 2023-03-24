/**
 * Master class with properties id, name, rating and list of cities
 */
class Master {
    id;
    name;
    rating;
    cityList;
    isDeleted;

    /**
     * 
     * @param {integer} id 
     * @param {text} name 
     * @param {integer} rating 
     * @param {Array} cityList
     * @param {boolean} isDeleted
     */
    constructor (id, masterName, rating, cityList, isDeleted) {
        this.id = id;
        this.name = masterName;
        this.rating = rating;
        this.cityList = cityList;
        this.isDeleted = isDeleted;
    }
}

module.exports = Master;