import { Request } from "../api/api.request";

const findOrdersByMaster = async(id) => {
  let res = null;
  try { 
    const apiRequest = new Request({masterId: id});
    res = await apiRequest.getOrdersByMaster();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }    
  return res;  
}

export default findOrdersByMaster ;
