import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';

const MasterListItem = (props) => {    
    const {id, name, rating} = props.value;
    return (      
        <div className='master-select'>
          <div className='master-select-radio'>
            <Radio 
              id={id.toString()}
              value={name}
              name='masters'
              color="default" 
            />
          </div>
          <div>
            <Box
            sx={{
            '& > legend': { mt: 2 },
            }}
            >        
            <Typography component="legend">{name}</Typography>
            <Rating name="master" value={rating} readOnly />
            </Box>
          </div>          
        </div>
                    
   );
  }

const MasterList = (props) => {   
    const masters = props.masters;
    return (
      <div>
        {masters.map((master) =>
          <MasterListItem key={master.id.toString()}
                          value={master} />
        )}
      </div>
    );
  }

export default MasterList;
