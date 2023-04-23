import React, { useState, useEffect } from 'react';
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
const RemoveCityForMasterModal = ({ open, onClose, onSubmit, updateState, masters }) => {

    const [values, setValues] = useState({});
    const [master, setMaster] = useState(null);
    const [cityList, setCityList] = useState([]); 
    const [disabled, setDisabled] = useState(true) 

    useEffect(
      () => {        
        const masterCities = (selectedMaster) => masters.reduce((res, master) => {
          if(master.id === selectedMaster){
            res = master.cityList;
          }      
          return res;
        }, []);

        setCityList(masterCities(master));
      }, [masters, master]
    )
  
    const handleSubmit = () => {      
      onSubmit(values);
      setValues(null);
      setMaster(null);
      updateState();
      onClose();
    };
    
    if(cityList.length < 1){
      return (
        <Dialog open={open}>
          <DialogTitle textAlign="center">Remove City for Master</DialogTitle>
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
                  label='Select Master'
                  select
                  size='small'
                  name='masterId'
                  defaultValue={''}
                  onChange={ (e) => {               
                    setMaster(e.target.value);                  
                    setValues({ ...values, [e.target.name]: e.target.value });
                    }
                  }
                  >
                    {masters.map((master) => (
                    <MenuItem key={master.name} value={master.id}>
                        {master.name}
                    </MenuItem>
                    ))}
                  </ TextField>                  
                </>                
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button onClick={()=>{setMaster(null); onClose()}}>Cancel</Button>
            <Button color="inherit" onClick={handleSubmit} variant="contained" disabled>
              Remove City
            </Button>
          </DialogActions>
        </Dialog>
        
      );
    } else {
      return (
        <Dialog open={open}>
          <DialogTitle textAlign="center">Remove City for Master</DialogTitle>
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
                  disabled
                  select
                  size='small'
                  name='masterId'
                  defaultValue={''}
                  onChange={ (e) => {               
                    setMaster(e.target.value);                  
                    setValues({ ...values, [e.target.name]: e.target.value });
                    }
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
                  name='city'
                  defaultValue={''}                
                  onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value })
                      setDisabled(false);
                    }
                  }
                  >
                    {cityList.map((city, i) => (
                    <MenuItem key={i} value={city}>
                        {city}
                    </MenuItem>
                    ))}
                  </ TextField>
                </>                
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button onClick={()=>{setCityList([])}}>Back</Button>
            <Button onClick={()=>{setMaster(null); onClose()}}>Cancel</Button>
            <Button color="inherit" onClick={()=>{handleSubmit(); setDisabled(true)}} variant="contained" disabled={disabled ? true : false}>
              Remove City
            </Button>
          </DialogActions>
        </Dialog>      
      );
    }
  };

  export default RemoveCityForMasterModal;

