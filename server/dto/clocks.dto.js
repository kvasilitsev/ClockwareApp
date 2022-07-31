/**
 * Clock class with properties id, size, repairDuration
 */
class Clock {
  id;
  size;
  repairDuration;

  /**
   * 
   * @param {integer} id 
   * @param {text} size 
   * @param {integer} repairDuration 
   */
  constructor (id, size, repairDuration) {
    this.id = id;
    this.size = size;
    this.repairDuration = repairDuration;
  }
}

module.exports = Clock;
