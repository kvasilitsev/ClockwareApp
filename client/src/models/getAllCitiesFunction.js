import { Request } from '../api/api.request';

export default async function cities (){
  try {
    const apiRequest = new Request();    
    return await apiRequest.getCities();         
  } catch (e) {
      console.log('error: ', e.response.data.message);          
  }      
}
