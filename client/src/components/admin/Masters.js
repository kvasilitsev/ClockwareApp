import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { RATING_REGEX, USER_REGEX } from '../../models/regExp';
import getAllMasters from '../../utils/getAllMastersFunction';
import deleteMaster from '../../utils/deleteMasterFunction';
import updateMaster from '../../utils/updateMasterFunction';

const validateRequired = (value) => !!value.length;

const Masters = () => {

  const navigate = useNavigate();
  const [masterList, setMasterList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {    
    getAllMasters()
    .then(data =>
      setMasterList(data)      
    );    
   }, []);

   const handleDeleteRow = async (row) => {    
    if (      
      !window.confirm(`Are you sure you want to delete master ${row.getValue('name')}?`)
    ) {
      return;
    }      
     await deleteMaster(row.getValue('id'));
     window.location.replace('/masters');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    try{
      await updateMaster(values); 
    } catch(err){
        console.log(err)
    }       
    exitEditingMode();
    window.location.replace('/masters');
  };

  const handleCancelRowEdits = () => {    
    setValidationErrors({});
  }; 

  const validate = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'name'
              ? USER_REGEX.test(event.target.value)          
              : cell.column.id === 'rating'
              ? RATING_REGEX.test(event.target.value)
              : validateRequired(event.target.value);    
          if (!isValid) {            
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {            
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

   const columns = useMemo(
    () => [
      {
        header: 'Master Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'Master Id',
      },
      {
        header: 'Master Name',
        accessorKey: 'name',
        footer: 'Master Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),               
      },
      {
        header: 'Rating',
        accessorKey: 'rating',
        footer: 'Rating',        
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),        
      }                
    ],
    [validate],
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
    data={masterList}     
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
        onClick={() => navigate('/createMaster')}
        variant="contained"
      >
        Create New Master
      </Button>       
    )}    
    />
  </>
  ); 
}

export default Masters;

