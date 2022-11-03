/**
 * Order class with properties id, userId, masterId, cityId, clockId, bookingDateTime, repairDuration
*/
 class Order {
    id;
    userId;
    masterId;
    cityId;
    clockId;
    bookingDateTime;    
    repairDuration;
    email;
    name;
  
    /**
     * 
     * @param {integer} id 
     * @param {integer} userId 
     * @param {integer} masterId 
     * @param {integer} cityId 
     * @param {integer} clockId 
     * @param {timestamp} bookingDateTime    
     * @param {interval} repairDuration
     * @param {varchar} email
     * @param {varchar} name
     */
    constructor (id, userId, masterId, cityId, clockId, bookingDateTime, repairDuration, emaill, name) {
      this.id = id;
      this.userId = userId;
      this.masterId = masterId;
      this.cityId = cityId;
      this.clockId = clockId;
      this.bookingDateTime = bookingDateTime;      
      this.repairDuration = repairDuration;
      this.email = email;
      this.name = name;
  }
}
  
module.exports = Order;