import { Request } from '../api/api.request';
import { USER_REGEX, EMAIL_REGEX } from '../models/regExp';

const validate = values => {
  let errors = false;
  if (!values.name) {
    window.alert('Name Required');
    errors = true;
    return  errors;
  } else if (!USER_REGEX.test(values.name)) {
    window.alert('Invalid name');
    errors = true;
    return  errors;
  };

  if (!values.email) {
    window.alert(' Email Required');
    errors = true;
    return  errors;
  } else if (!EMAIL_REGEX.test(values.email)) {
    window.alert('Invalid email address');
    errors = true;
    return  errors;
  }
  return  errors;
};

/**
 * Function performs api request createUser()
 * @param {object} values an object of values
 */
async function createNewUser(values) {  
  const validation = validate(values);
  if(!validation){
    try {        
      const apiRequest = new Request({name: values.name, email: values.email});        
      const validate = await apiRequest.createUser();              
      if(!validate.isEmail){
        window.alert(`User with email ${values.email} already exist, please check email`);        
      }              
    } catch (e) {
      console.log('error: ', e.response);
    }
  }  
}

export default createNewUser;

