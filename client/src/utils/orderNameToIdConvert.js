import cities from './getAllCitiesFunction';
import clocks from './getAllClocksFunction';
import masters from './getAllMastersFunction';

async function orderNameToId (order){  
  const cityList = await cities();
  const clockList = await clocks();
  const masterList = await masters();  
  const city = cityList.find(element => element.name === order.cityName);
  const clock = clockList.find(element => element.size === order.clockSize);
  const master = masterList.find(element => element.name === order.masterName);  
  const newOrder = {
    id: order.id,
    cityId: city.id,
    clockId: clock.id,
    masterId: master.id,
    bookingTime: order.bookingTime,
    email: order.email
  }  
  return newOrder;
}  

export default orderNameToId;
