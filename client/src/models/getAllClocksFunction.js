import { Request } from '../api/api.request';

export default async function clocks (){
  try {
    const apiRequest = new Request();    
    return await apiRequest.getClocks();         
  } catch (e) {
      console.log('error: ', e.response);          
    }      
}
