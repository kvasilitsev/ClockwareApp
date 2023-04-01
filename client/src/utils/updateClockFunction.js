import { Request } from "../api/api.request";
import { USER_REGEX, ID_REGEXP } from '../models/regExp';

const updateClock = async(values) => { 
  const{ id, size, repairDuration } = values;
  if(!size || !repairDuration){
    alert('No empty fieal allowed!');
    return;
  } else if(!USER_REGEX.test(size)){
    alert('Invalid size!');
    return;
  } else if(!ID_REGEXP.test(repairDuration)){
    alert('Invalid repair duration!');
    return;
  }
  try { 
    const apiRequest = new Request({repairDuration: repairDuration, size: size, clockId: id});   
    return await apiRequest.updateClock();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateClock;

