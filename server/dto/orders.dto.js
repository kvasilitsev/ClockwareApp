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
  
    /**
     * 
     * @param {integer} id 
     * @param {integer} userId 
     * @param {integer} masterId 
     * @param {integer} cityId 
     * @param {integer} clockId 
     * @param {timestamp} bookingDateTime    
     * @param {interval} repairDuration
     */
    constructor (id, userId, masterId, cityId, clockId, bookingDateTime, repairDuration) {
      this.id = id;
      this.userId = userId;
      this.masterId = masterId;
      this.cityId = cityId;
      this.clockId = clockId;
      this.bookingDateTime = bookingDateTime;      
      this.repairDuration = repairDuration;
  }
}
  
module.exports = Order;