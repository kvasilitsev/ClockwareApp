import { Request } from '../api/api.request';
import { USER_REGEX, EMAIL_REGEX } from '../models/regExp';
import UTCConverter from './UTCDateConvert';

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

  if (!values.cityId) {
    window.alert('City Required');
    errors = true;
    return  errors;
  }

  if (!values.masterId) {
    window.alert('Master Required');
    errors = true;
    return  errors;
  }

  if (!values.bookingTime) {
    window.alert('Booking time Required');
    errors = true;
    return  errors;
  }

return  errors;
};

/**
 * Function performs api request createOrder()
 * @param {object} values an object of values
 */
async function CreateNewOrder(values) {
  const validation = validate(values);
  if(!validation){
    const modifyTime = UTCConverter(values.bookingTime);
    try {                        
      const apiRequest = new Request({name: values.name, email: values.email, cityId: values.cityId, masterId: values.masterId, clockId: values.clockId, bookingTime: modifyTime});       
      const freeMasters = await apiRequest.getFreeMasters();         
      if(freeMasters.length < 1){
        window.alert(`No masters available in this city at selected time`);        
        return 
      }
      const isMasterInList = freeMasters.filter(master => master.id === values.masterId);
      if (isMasterInList.length !== 1){
        window.alert(`master is not available`);        
        return 
      }
      await apiRequest.createOrder();      
    } catch (e) {
      console.log('error: ', e.response);
    }
  }  
}

export default CreateNewOrder;

