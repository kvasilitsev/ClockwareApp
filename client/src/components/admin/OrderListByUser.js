import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import findOrdersByUser from "../../models/findOrdersByUserFunction";
import Row from '../Row';
import Table from 'react-bootstrap/Table';


const OrderListByUser = () => {
  const { state } = useLocation();  
  const [orderList, setOredrList] = useState([]);
  useEffect(() => {    
    findOrdersByUser(state)
    .then(data =>
      setOredrList(data)
    );
   });
  if (orderList < 1){
    return (<h4>No orders found for user with email={state}</h4>)
  } else {
      return (
        <div className="orderList-table">
          <h4>User email={state} order list</h4>
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
  }
export default OrderListByUser;
