import { Request } from "../api/api.request";

const updateClock = async(values) => { 
  const{ id, size, repairDuration } = values;
  try { 
    const apiRequest = new Request({repairDuration: repairDuration, size: size, clockId: id});   
    return await apiRequest.updateClock();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateClock;

