import { Request } from "../api/api.request";

const deleteOrder = async(id) => {  
  try { 
    const apiRequest = new Request({orderId: id});
    return await apiRequest.deleteOrder();                      
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default deleteOrder;
