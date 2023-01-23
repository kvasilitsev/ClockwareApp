import React, { useMemo, useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';
import findAllOrders from '../../models/findAllOrdersFunction';
import {
  Box,  
  IconButton,  
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import deleteOrder from '../../models/deleteOrderFunction'

const DeleteOrder = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {    
    findAllOrders()
    .then(data =>
      setOrderList(data)
    );
   }, []);  
  const handleDeleteRow = async (row) => {
      if (
        !window.confirm(`Are you sure you want to delete order ${row.getValue('id')}`)
      ) {
        return;
      }      
       await deleteOrder(row.getValue('id'));
       window.location.replace('/delete-order');      
    }   
  
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
    displayColumnDefOptions={{
      'mrt-row-actions': {
        muiTableHeadCellProps: {
          align: 'center',
        },
        size: 120,
      },
    }}
    columns={columns}
    data={orderList}
    editingMode="modal" //default
    enableColumnOrdering
    enableEditing   
    renderRowActions={({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>        
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    )}    
    />
  );  
};

export default DeleteOrder;
