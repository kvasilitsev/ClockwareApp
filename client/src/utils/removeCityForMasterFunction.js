import { Request } from '../api/api.request';

/**
 * Function performs api request createMaster()
 * @param {object} values an object of values
 */
async function removeCityForMaster(values) {
    
  try {              
      const apiRequest = new Request({ cityName: values.city, masterId: values.masterId });        
      const res = await apiRequest.removeCityForMaster(); 
      res.data ? window.alert(`City has been removed!`) : window.alert('Failed!');                                        
    } catch (e) {
      console.log('error: ', e.response.data.message);       
    } 
               
}

export default removeCityForMaster;

