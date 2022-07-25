/**
 * Master class with properties id, name, rating and list of cities
 */
class Master {
    id;
    name;
    rating;
    cityList;

    /**
     * 
     * @param {integer} id 
     * @param {text} name 
     * @param {integer} rating 
     * @param {Array} cityList
     */
    constructor (id, masterName, rating, cityList) {
        this.id = id;
        this.name = masterName;
        this.rating = rating;
        this.cityList = cityList;
    }
}

module.exports = Master;