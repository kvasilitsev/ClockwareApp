import clocks from './getAllClocksFunction';

const clockOptions = async() => {
  const clocksArr = await clocks();
  return clocksArr.map(clock => {
    clock['label'] = clock['size'];
    clock['value'] = clock['id'];
    delete clock['size'];
    delete clock['id'];    
    return clock;  
  })
}

export default clockOptions;