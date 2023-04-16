import { Request } from '../api/api.request';
import { ID_REGEXP } from '../models/regExp';

const validate = values => {
  let errors = false;
  if (!values.size) {
    window.alert('Size Required');
    errors = true;
    return  errors;
  }
  if (!values.repairDuration) {
    window.alert('Repair duration Required');
    errors = true;
    return  errors;
  } else if (!ID_REGEXP.test(values.repairDuration)) {
    window.alert('Invalid repair duration');
    errors = true;
    return  errors;
  }
  return  errors;
};

/**
 * Function performs api request createClock()
 * @param {object} values an object of values
 */
async function createNewClock(values) {   
  const validation = validate(values);  
  if(!validation){
    try {              
        const apiRequest = new Request({ size: values.size, repairDuration: values.repairDuration });        
        await apiRequest.createClock();        
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }      
  }     
}

export default createNewClock;

