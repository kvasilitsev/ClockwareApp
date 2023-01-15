import { Request } from "../api/api.request";

const findOrdersByUser = async(email) => {
  let res = null;
  try { 
    const apiRequest = new Request({email: email});
    res = await apiRequest.getOrdersByUser();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }    
  return res;  
}

export default findOrdersByUser;