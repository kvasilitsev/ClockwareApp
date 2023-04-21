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
 * Function creates modal window create new master
 * @param {*} param0 
 * @returns 
 */
const CreateNewMasterModal = ({ open, onClose, onSubmit, updateState }) => {

    const [values, setValues] = useState({});   
  
    const handleSubmit = () => {      
      onSubmit(values);
      setValues(null);
      updateState();
      onClose();
    };
    
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Master</DialogTitle>
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
                  label='Master name'                        
                  size='small'
                  name='name'
                  defaultValue={''}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                >                
                </TextField>
                <TextField                
                  label='Rating'                        
                  size='small'
                  name='rating'
                  defaultValue={''}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                >                
                </TextField>
              </>              
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

  export default CreateNewMasterModal;

