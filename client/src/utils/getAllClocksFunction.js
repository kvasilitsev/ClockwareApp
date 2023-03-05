import { Request } from '../api/api.request';

 async function getAllClocks (){
  try {
    const apiRequest = new Request();    
    const res = await apiRequest.getClocks();
    //set repair duration in hours        
    const clocks = res.map(clock => {                   
      clock.repairDuration = clock.repairDuration['hours'];
      return clock;
    });    
    return clocks;
  } catch (e) {
      console.log('error: ', e.response);          
    }      
}

export default getAllClocks;

