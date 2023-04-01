import { Request } from "../api/api.request";
import orderNameToId from './orderNameToIdConvert';
import { EMAIL_REGEX} from '../models/regExp';

const updateOrder = async(values) => {
  const order = await orderNameToId(values);
  if(!order.email){
    alert('No empty field allowed!');
    return;
  } else if(!EMAIL_REGEX.test(order.email)){
    alert('Invalid email');
    return;
  }
  try { 
    const apiRequest = new Request({orderId: order.id, clockId: order.clockId, cityId: order.cityId, masterId: order.masterId, email: order.email, bookingTime: order.bookingDateTime});   
    return await apiRequest.updateOrder();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateOrder;
