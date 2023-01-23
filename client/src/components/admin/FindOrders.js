import React, { useMemo, useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';
import findAllOrders from '../../models/findAllOrdersFunction';

const FindOrders = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {    
    findAllOrders()
    .then(data =>
      setOrderList(data)
    );
   }, []);  
  
  const columns = useMemo(
    () => [
      {
        header: 'Order id',
        accessorKey: 'id', 
      },
      {
        header: 'Master id',
        accessorKey: 'masterId', 
      },
      {
        header: 'City id',
        accessorKey: 'cityId', 
      },
      {
        header: 'Clock id',
        accessorKey: 'clockId', 
      },
      {
        header: 'Booking time',
        accessorKey: 'bookingDateTime', 
      },
      {
        header: 'User email',
        accessorKey: 'email', 
      },
      {
        header: 'Repair duration',
        accessorKey: 'repairDuration.hours',
      },
    ],
    [],
  );
  return (
    <MaterialReactTable    
    columns={columns}
    data={orderList}
    editingMode="modal" 
    enableColumnOrdering
    enableEditing
    />
  );  
};

export default FindOrders;
