import cities from '../models/getAllCitiesFunction';

const cityOptions = async() => {
  const citiesArr = await cities(); 
  return citiesArr.map(city => {
    city['label'] = city['name'];
    city['value'] = city['id'];
    delete city['name'];
    delete city['id'];
    return city;  
  })
}

export default cityOptions;
