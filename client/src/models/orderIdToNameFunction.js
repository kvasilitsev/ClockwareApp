import cities from './getAllCitiesFunction';
import clocks from './getAllClocksFunction';
import masters from './getAllMastersFunction';

async function orderIdToName (orderList){
  const cityList = await cities();
  const clocksList = await clocks();
  const masterList = await masters();
  const newOrderList = orderList.map(order => {
    const city = cityList.find(element => element.id === order.cityId);
    const clock = clocksList.find(element => element.id === order.clockId);
    const master = masterList.find(element => element.id === order.masterId);
    order.cityId = city.name;
    order.clockId = clock.size;
    order.masterId = master.name;
    return order;
  })
  return newOrderList;
}

export default orderIdToName;
