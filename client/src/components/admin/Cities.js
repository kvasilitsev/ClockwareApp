import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { USER_REGEX } from '../../models/regExp';
import getAllCities from '../../utils/getAllCitiesFunction';
import deleteCity from '../../utils/deleteCityFunction';
import updateCity from '../../utils/updateCityFunction';
import CreateNewCityModal from '../../utils/CreateNewCityModal'
import createNewCity from '../../utils/createNewCityFunction'

const validateRequired = (value) => !!value.length;

const Cities = () => {

  const [componentLoaded, setComponentLoaded] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {    
    getAllCities()
    .then(data =>
      setCityList(data)      
    );    
   }, [componentLoaded]);

   const handleDeleteRow = async (row) => {    
    if (      
      !window.confirm(`Are you sure you want to delete city ${row.getValue('name')}?`)
    ) {
      return;
    }      
      await deleteCity(row.getValue('id'));
      setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000);
      navigate('/cities');     
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    if (!Object.keys(validationErrors).length){
    try{
      await updateCity(values); 
    } catch(err){
        console.log(err)
    }       
      exitEditingMode();
      setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000);
      navigate('/cities'); 
    }
  };

  const handleCancelRowEdits = () => {    
    setValidationErrors({});
  };

  const handleCreateCity = (values) => {    
    createNewCity(values);
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
        header: 'City Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'City Id',
      },
      {
        header: 'City',
        accessorKey: 'name',
        footer: 'City',
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
    data={cityList}     
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
        Create New City
      </Button>
    )}
    />
    <CreateNewCityModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      updateState={() => { setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000)}}
      onSubmit={handleCreateCity}
    />
  </>
  ); 
}

export default Cities;

