import { Request } from '../api/api.request';

export default async function clocks (){
  try {
    const apiRequest = new Request();    
    const clocks = await apiRequest.getClocks();
    return clocks;
  } catch (e) {
      console.log('error: ', e.response);          
    }      
}
