import { Request } from "../api/api.request";
import orderNameToId from './orderNameToIdConvert';

const updateOrder = async(values) => {
  const order = await orderNameToId(values);
  try { 
    const apiRequest = new Request({orderId: order.id, clockId: order.clockId, cityId: order.cityId, masterId: order.masterId, email: order.email, bookingTime: order.bookingDateTime});   
    return await apiRequest.updateOrder();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateOrder;
