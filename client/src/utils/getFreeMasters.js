import { Request } from '../api/api.request';
import UTCConverter from '../utils/UTCDateConvert';

async function getFreeMasters (values) {     

  let list;
  try {              
    values.bookingTime = UTCConverter(values.bookingTime); //to convert time to UTC                        
    const apiRequest = new Request({clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime}); //for production only when server in UTC zone
    const res = await apiRequest.getFreeMasters();        
    list = res.data;
  } catch (e) {
      console.log('error: ', e.response.data.message);          
  }        
  if(list.length > 0){                 
    return (list)
  } else {
    window.alert(`No masters available`)
    window.location.replace('/orders');       
  }        
}

    export default getFreeMasters;

