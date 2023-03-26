import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, 
  Stack,
  TextField  
} from '@mui/material';

/**
 * Function creates modal window create new city
 * @param {*} param0 
 * @returns 
 */
const CreateNewCityModal = ({ open, columns, onClose, onSubmit }) => {

    const [values, setValues] = useState({});   
  
    const handleSubmit = () => {      
      onSubmit(values);
      setValues(null);
      onClose();
    };
    
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New City</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns.map((column) => {                
                if(column.id !== 'id') {
                  return (
                    <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    />
                  )
                }
                return null;
              }                
              )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="inherit" onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default CreateNewCityModal;

