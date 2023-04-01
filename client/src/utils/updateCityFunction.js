import { Request } from "../api/api.request";
import { USER_REGEX } from '../models/regExp';

const updateCity = async(values) => { 
  const{ name, id } = values;
  if(!name){
    alert('Name required!');
    return;
  } else if (!USER_REGEX.test(name)){
    alert('Invalid city name');
    return;
  }
  try { 
    const apiRequest = new Request({name: name, cityId: id});   
    return await apiRequest.updateCity();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateCity;
