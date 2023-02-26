import { Request } from "../api/api.request";

const findAllOrders = async() => {
  let res = null;
  try { 
    const apiRequest = new Request({});
    res = await apiRequest.getAllOrders();
                      
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }  
  return res;
}

export default findAllOrders ;
