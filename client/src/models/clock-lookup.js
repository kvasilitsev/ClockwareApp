import { Request } from '../api/api.request';

async function clocks (){
  try {
    const apiRequest = new Request();    
    return await apiRequest.getClocks();         
  } catch (e) {
      console.log('error: ', e.response);          
    }      
  }
const clockLookUp = async() => {
  const clocksArr = await clocks();
  return clocksArr.map(clock => {
    clock['label'] = clock['size'];
    clock['value'] = clock['id'];
    delete clock['size'];
    delete clock['id'];
    delete clock['repairDuration']
    return clock;  })
}

export default clockLookUp();