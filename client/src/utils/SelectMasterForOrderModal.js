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
 * Function creates modal window to select master to create order for table order 
 * @param {*} param0 
 * @returns 
 */
const SelectMasterForOrder = ({ open, onClose, values, masterList}) => {

   const [completeValues, setCompleteValues] = useState(values);  

  const handleSubmit = () => {
    console.log(values)        
    onClose();
  };
  
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Select Master to Create Order</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >                      
            <TextField                
              label='Master'
              select
              size='small'
              name='masterId'
              defaultValue={''}
              onChange={(e) =>
                setCompleteValues({ ...completeValues, [e.target.name]: e.target.value })
              }
            >
              {masterList.map((master) => (
                <MenuItem key={master.name} value={master.id}>
                  {master.name}
                </MenuItem>
              ))}
            </ TextField>                    
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

export default SelectMasterForOrder;

