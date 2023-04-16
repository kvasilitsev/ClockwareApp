import { Request } from '../api/api.request';
import { RATING_REGEX, USER_REGEX } from '../models/regExp';

const validate = values => {
  let errors = false;
  if (!values.name) {
    window.alert('Name Required');
    errors = true;
    return  errors;
  } else if (!USER_REGEX.test(values.name)) {
    window.alert('Invalid master name');
    errors = true;
    return  errors;
  }
  if (!values.rating) {
    window.alert('Rating Required');
    errors = true;
    return  errors;
  } else if (!RATING_REGEX.test(values.rating)) {
    window.alert('Invalid rating');
    errors = true;
    return  errors;
  }
  return  errors;
};

/**
 * Function performs api request createMaster()
 * @param {object} values an object of values
 */
async function createNewMaster(values) {   
  const validation = validate(values);  
  if(!validation){
    try {              
        const apiRequest = new Request({ name: values.name, rating: values.rating });        
        const validate = await apiRequest.createMaster();
        if(validate.isMaster){
            window.alert(`Master with name ${values.name} already exist, please check master name`);        
          }                     
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }     
  }     
}

export default createNewMaster;

