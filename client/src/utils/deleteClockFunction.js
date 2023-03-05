import { Request } from "../api/api.request";

const deleteClock = async(id) => {  
  try { 
    const apiRequest = new Request({clockId: id});
    await apiRequest.deleteClock();           
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default deleteClock;
