import { Request } from "../api/api.request";
import { RATING_REGEX, USER_REGEX } from '../models/regExp';

const updateMaster = async(values) => { 
  const { rating, name, id } = values;
  if (!rating || !name){
    alert('no empty field allowed');
    return;
  } else if (!USER_REGEX.test(name)){
    alert('invalid master name');
    return
  } else if (!RATING_REGEX.test(rating)){
    alert('invalid master rating');
    return
  }
  try {    
    const apiRequest = new Request({rating: rating, name: name, masterId: id});   
    return await apiRequest.updateMaster();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateMaster;

