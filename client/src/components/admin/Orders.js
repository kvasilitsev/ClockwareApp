import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import findAllOrders from '../../utils/getAllOrdersFunction';
import orderIdToName from '../../utils/orderListIdToNameConvert';
import { Box, Button, IconButton, MenuItem,  Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import deleteOrder from '../../utils/deleteOrderFunction';
import getAllCities from '../../utils/getAllCitiesFunction';
import getAllClocks from '../../utils/getAllClocksFunction';
import getAllMasters from '../../utils/getAllMastersFunction';
import DatePicker from "react-datepicker";
import UTCConverter from '../../utils/UTCDateConvert';
import { EMAIL_REGEX } from '../../models/regExp';
import "react-datepicker/dist/react-datepicker.css";
import updateOrder from "../../utils/updateOrderFunction";
import timeformatConvert from '../../utils/timeFormatConvert';
import CreateNewOrderModal from '../../utils/CreateNewOrderModal';
import getMinTime from '../../utils/getMinTime';

const validateRequired = (value) => !!value.length;

const Orders = () => {  
  const [orderList, setOrderList] = useState([]);  
  const [nameOrderList, setNameOrderList] = useState([]);  
  const [cities, setCities] = useState([]);
  const [clocks, setClocks] = useState([]);
  const [masters, setMasters] = useState([]);
  const [bookingTime, setBookingTime] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  
      
  useEffect(() => {    
    findAllOrders()
    .then(data =>
      setOrderList(data)
    );
    getAllCities()
    .then(data =>
      setCities(data)
    );
    getAllClocks()
    .then(data =>
      setClocks(data)
    );
    getAllMasters()
    .then(data =>
      setMasters(data)
    );   
   }, []);
   
  useEffect(() => {    
    orderIdToName(orderList)
    .then(data =>
      setNameOrderList(data)
    );
  }, [orderList]);  

  const validate = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? EMAIL_REGEX.test(event.target.value)              
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const handleDeleteRow = async (row) => {
    if (
      !window.confirm(`Are you sure you want to delete order ${row.getValue('id')}`)
    ) {
      return;
    }      
     const validateDelete = await deleteOrder(row.getValue('id'));     
     if(validateDelete.isExpired){
      alert(`Expired/Complited order can not be deleted`);  
    }
     window.location.replace('/orders');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    if (!Object.keys(validationErrors).length){
      if (bookingTime) {        
        const modifyTime = UTCConverter(bookingTime)    
        values.bookingTime = modifyTime;        
        setBookingTime('');      
      }      
      const validateUpdate = await updateOrder(values);

      if(!validateUpdate.isUser){ 
        alert(`User with email ${values.email} does not exist, please create the user first`);      
      } else if(!validateUpdate.isMaster){      
        alert(`Master ${values.masterName} does not work in city ${values.cityName}, please select another master`);   
      } else if(!validateUpdate.isTime){
        alert(`Master ${values.masterName} is not available at this time, please select another master or booking time`); 
      } else if(validateUpdate.isExpired){
        alert(`Expired/Complited order can not be updated`);  
      }
      exitEditingMode();
      window.location.replace('/orders');
    }
  };

  const handleCancelRowEdits = () => {
    setBookingTime('');
    setValidationErrors({});
  };  

  const columns = useMemo(
    () => [
      {
        header: 'Order Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'Order Id',
      },
      {
        header: 'Master',
        accessorKey: 'masterName',
        footer: 'Master',
        muiTableBodyCellEditTextFieldProps: {          
          select: true,          
          children: masters.map((master) => (            
            <MenuItem key={master.id} value={master.name}>
              {master.name}
            </MenuItem>
          )),
        },               
      },
      {
        accessorKey: 'cityName',
        header: 'City',
        footer: 'City',        
        muiTableBodyCellEditTextFieldProps: {
          select: true, 
          children: cities.map((city) => (            
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          )),
        },        
      },
      {
        header: 'Clock Size',
        accessorKey: 'clockSize',
        footer: 'Clock Size',       
        muiTableBodyCellEditTextFieldProps: {                  
          select: true, 
          children: clocks.map((clock) => (            
            <MenuItem key={clock.id} value={clock.size}>
              {clock.size}
            </MenuItem>
          )),
        },        
      },
      {
        header: 'Booking Time',        
        accessorFn: (row) => {
          let date = row.bookingDateTime;          
          const formatedDate = timeformatConvert(date);        
          return formatedDate; 
        },
        id: 'bookingTime',
        footer: 'Booking Time',        
        Edit: ({ cell, row }) =>                                      
        <>         
            <label className="datePicker-label">Booking time</label>
            <DatePicker            
            className='datePicker'
            selected={bookingTime}
            timeFormat="HH:mm"
            dateFormat='MMMM d, yyyy, HH:mm'
            name='bookingTime'
            placeholderText = {timeformatConvert(row.original.bookingDateTime)}
            showTimeSelect            
            minTime={getMinTime(bookingTime)}
            maxTime={new Date().setHours(16)}
            timeIntervals={60}
            minDate={new Date()}            
            onChange={selectedDate => {
              setBookingTime(selectedDate);                                               
            }}            
            />         
        </>                                                 
      },
      {
        header: 'User Email',
        accessorKey: 'email',
        footer: 'User Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),
          type: 'email',
        }),
      },      
    ],
    [cities, clocks, masters, bookingTime, validate],
  );
  return (
  <>
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
    data={nameOrderList}     
    enableEditing  
    editingMode="modal"    
    onEditingRowSave={handleSaveRowEdits}
    onEditingRowCancel={handleCancelRowEdits}   
    renderRowActions={({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="left" title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
             <Edit />
          </IconButton>
        </Tooltip>       
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    )}
    renderTopToolbarCustomActions={() => (
      <Button
        color="inherit"
        onClick={() => setCreateModalOpen(true)}
        variant="contained"
      >
        Create New Order
      </Button>
    )}
  />
    <CreateNewOrderModal      
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}      
    />    
  </>
  );  
};

export default Orders;
