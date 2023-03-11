const orderService = require("../services/order.services");
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity OrderController
 */
class OrderController {

  /**
   * Method interprets http request to creates new order
   * @param {*} req 
   * @param {*} res 
   */
  async createOrder(req, res) {
    const {masterId, cityId, clockId, bookingTime, email, name} = req.body;
    try {
      await orderService.createOrder(masterId, cityId, clockId, bookingTime, email, name);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );      
    }
    res.send(true);
  };

  /**
   * Method interprets http request to select all orders
   * @param {*} req 
   * @param {*} res 
   */
  async getOrders(req, res) {
    const orders = await orderService.getOrders();    
    res.json(orders);
  };

  /**
   * Method interprets http request to select order by its id
   * @param {*} req 
   * @param {*} res 
   */
  async getOrderById(req, res) {
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    res.json(order);   
  }; 

  /**
   * Method interprets http request to select order by master id
   * @param {*} req 
   * @param {*} res 
   */
   async getOrdersByMasterId(req, res) {
    const { id } = req.query;   
    const orders = await orderService.getOrdersByMasterId(id);    
    res.json(orders);   
  }; 
  
  /**
   * Method interprets http request to select order by user email
   * @param {*} req 
   * @param {*} res 
   */
  async getOrdersByUser(req, res) {    
    const { email } = req.query;
    const orders = await orderService.getOrdersByUser(email);    
    res.json(orders);   
  }; 

  /**
   * Method interprets http request to update order data by their id
   * @param {*} req 
   * @param {*} res 
   */  
  async updateOrder(req, res) {
    const {id, email, masterId, cityId, clockId, bookingTime} = req.body.params;
    let response = null;
    try {                
     response = await orderService.updateOrder(id, email, masterId, cityId, clockId, bookingTime);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err
      });      
    }      
    res.send(response);
  };

  /**
   * Method interprets http request to delete order by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteOrder(req, res) {    
    const { id } = req.body.params;    
    try {
      await orderService.deleteOrder(id);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  };  
}

module.exports = new OrderController();
