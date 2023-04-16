import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, 
  Stack,
  TextField,
  MenuItem 
} from '@mui/material';
import getAllCities from './getAllCitiesFunction';
import getAllClocks from './getAllClocksFunction';
import getAllMasters from './getAllMastersFunction';
import createNewOrder from './createNewOrderFunction'


/**
 * Function creates modal window create order for table order 
 * @param {*} param0 
 * @returns 
 */
const CreateNewOrderModal = ({ open, onClose, updateState }) => {  

  const [values, setValues] = useState({});
  const [cities, setCities] = useState([]);
  const [clocks, setClocks] = useState([]);
  const [masters, setMasters] = useState([]);    
  const [bookingTime, setBookingTime] = useState('');
  
  
  useEffect(() => {     
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


  const handleSubmit = () => { 
    createNewOrder(values);        
    setValues(null);    
    setBookingTime(null);
    updateState();
    onClose();     
  };

  return (    
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Order</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <>
              <TextField                 
                label='User Name'
                name='name'
                size='small'
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              <TextField                 
                label='User email'
                name='email'
                size='small'
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              <TextField                
                label='City'
                select
                size='small'
                name='cityId'
                defaultValue={''}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </ TextField>
              <TextField                
                label='Master'
                select
                size='small'
                name='masterId'
                defaultValue={''}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              >
                {masters.map((master) => (
                  <MenuItem key={master.name} value={master.id}>
                    {master.name}
                  </MenuItem>
                ))}
              </ TextField>
              <TextField                
                label='Clock size'
                select
                size='small'
                name='clockId'
                defaultValue={''}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              >
                {clocks.map((clock) => (
                  <MenuItem key={clock.size} value={clock.id}>
                    {clock.size}
                  </MenuItem>
                ))}
              </ TextField>
              <DatePicker                                                         
                className='datePicker'
                selected={bookingTime}
                timeFormat="HH:mm"
                dateFormat='MMMM d, yyyy, HH:mm'
                name='bookingTime'
                placeholderText = {'Boking time'}
                showTimeSelect
                minTime={new Date().setHours(7)}
                maxTime={new Date().setHours(16)}
                timeIntervals={60}
                minDate={new Date()}                                
                onChange={selectedDate => {
                  setBookingTime(selectedDate);                  
                  setValues({ ...values, 'bookingTime': selectedDate })                                                                            
                }}            
              />
            </>           
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="inherit" onClick={handleSubmit} variant="contained">
          Create Order
        </Button>        
      </DialogActions>
    </Dialog>     
  );
};

export default CreateNewOrderModal;

