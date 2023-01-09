import { useEffect, useState } from "react";
import findAllOrders from '../../models/findAllOrdersFunction';
import Row from '../Row';
import Table from 'react-bootstrap/Table';


const FindAllOrders = () => {
  const [orderList, setOredrList] = useState([]);
  useEffect(() => {    
    findAllOrders()
    .then(data =>
      setOredrList(data)
    );
   }, []);  
  return (
    <div className="orderList-table">
      <h4>List of Existing Orders</h4>
      <Table striped bordered hover size="sm" variant="light">        
      <thead>
        <tr>
          <th>Order id</th>
          <th>Master id</th>
          <th>City id</th>
          <th>Clock id</th>
          <th>Booking time</th>
          <th>Email</th>
          <th>Repair duration (hours)</th>
        </tr>
      </thead>   
        <tbody>
          {orderList.map((order, index) =>
            <Row key={index}
                 id={order.id} 
                 masterId={order.masterId}
                 cityId={order.cityId}
                 clockId={order.clockId}
                 bookingDateTime={order.bookingDateTime}
                 email={order.email}
                 repairDuration={order.repairDuration.hours} />
            )
          }
        </ tbody>
      </ Table>
    </ div>  
  )
  }
export default FindAllOrders;
