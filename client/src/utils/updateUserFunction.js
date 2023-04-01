import { Request } from "../api/api.request";
import { EMAIL_REGEX, USER_REGEX } from '../models/regExp';

const updateUser = async(values) => { 
  const{ email, name, id } = values;
  if(!name || !email){
    alert('No empty field allowed!')
    return;
  } else if(!USER_REGEX.test(name)){
    alert('Invalid user name!');
    return;
  } else if(!EMAIL_REGEX.test(email)){
    alert('Invalid email!');
    return;
  }
  try { 
    const apiRequest = new Request({email: email, name: name, userId: id});   
    return await apiRequest.updateUser();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateUser;

