import React, { useState } from 'react';
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


/**
 * Function creates modal window create new master
 * @param {*} param
 * @returns 
 */
const AddCityForMasterModal = ({ open, onClose, onSubmit, updateState, masters, cities }) => {

    const [values, setValues] = useState({});
  
    const handleSubmit = () => {      
      onSubmit(values);
      setValues(null);
      updateState();
      onClose();
    };
    
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Add City for Master</DialogTitle>
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
              </>                
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="inherit" onClick={handleSubmit} variant="contained">
            Add City
          </Button>
        </DialogActions>
      </Dialog>
      
    );
  };

  export default AddCityForMasterModal;

