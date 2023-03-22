import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { USER_REGEX, ID_REGEXP } from '../../models/regExp';
import getAllClocks from '../../utils/getAllClocksFunction';
import deleteClock from '../../utils/deleteClockFunction';
import updateClock from '../../utils/updateClockFunction';
import CreateNewClockModal from "../../utils/createNewClockModal";
import createNewClock from "../../utils/createNewClockFunction";

const validateRequired = (value) => !!value.length;

const Clocks = () => {

  const [clockList, setClockList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {    
    getAllClocks()    
    .then(data =>
      setClockList(data)      
    );    
   }, []);   
   const handleDeleteRow = async (row) => {    
    if (      
      !window.confirm(`Are you sure you want to delete clock ${row.getValue('size')}?`)
    ) {
      return;
    }      
     await deleteClock(row.getValue('id'));
     window.location.replace('/clocks');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    try{

      const validateUpdate = await updateClock(values);      
      if(validateUpdate.isExistentOrders){
        alert(`Could not edit clock due to orders with clock size ${values.size}
        and repair duration less then ${values.repairDuration} hours exist`);      
      }      
    } catch(err){
        console.log(err)
    }       
    exitEditingMode();
    window.location.replace('/clocks');
  };

  const handleCancelRowEdits = () => {    
    setValidationErrors({});
  }; 

  const handleCreateClock = (values) => {    
    createNewClock(values);
  };

  const validate = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'size'
              ? USER_REGEX.test(event.target.value)          
              : cell.column.id === 'repairDuration'
              ? ID_REGEXP.test(event.target.value)
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
        header: 'Clock Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'Clock Id',
      },
      {
        header: 'Size',
        accessorKey: 'size',
        footer: 'Size',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),               
      },
      {
        header: 'Repair duration',
        accessorKey: 'repairDuration',
        footer: 'Repair duration',        
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
    data={clockList}     
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
        Create New Clock
      </Button>
    )}
    />
    <CreateNewClockModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateClock}
    />    
  </>
  ); 
}

export default Clocks;

