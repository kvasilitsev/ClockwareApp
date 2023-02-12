import { Request } from '../api/api.request';

export default async function cities (){
  try {
    const apiRequest = new Request();
    const cities =  await apiRequest.getCities();    
    return cities;
  } catch (e) {
      console.log('error: ', e.response.data.message);          
  }      
}
