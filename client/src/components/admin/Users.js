import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { EMAIL_REGEX, USER_REGEX } from '../../models/regExp';
import getAllUsers from '../../models/getAllUsersFunction';
import deleteUser from '../../models/deleteUserFunction';
import updateUser from '../../models/updateUserFunction';

const Users = () => {

  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {    
    getAllUsers()
    .then(data =>
      setUserList(data)      
    );    
   }, []);

   const handleDeleteRow = async (row) => {
    if(row.original.admin){
      window.alert('Selected user is Admin and can not be deleted!');
      return;
    }
    if (      
      !window.confirm(`Are you sure you want to delete user ${row.getValue('name')} with email ${row.getValue('email')}?`)
    ) {
      return;
    }      
     await deleteUser(row.getValue('email'));
     window.location.replace('/users');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
        
    if(values.Admin === 'True'){
      window.alert('Selected user is Admin and can not be modified!');
      exitEditingMode();
    }

    const validateUpdate = await updateUser(values);
      
    if(!validateUpdate.isEmail){
      alert(`User with email ${values.email} already exist, please check email`);      
    } 
    exitEditingMode();
    window.location.replace('/users');
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
            cell.column.id === 'email'
              ? EMAIL_REGEX.test(event.target.value)              
              : USER_REGEX.test(event.target.value)
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
        header: 'User Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'User Id',
      },
      {
        header: 'User Name',
        accessorKey: 'name',
        footer: 'User Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),               
      },
      {
        header: 'Email',
        accessorKey: 'email',
        footer: 'Email',        
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),
          type: 'email',
        }),        
      },
      {
        header: 'Admin',
        accessorFn: (row) => (row.admin ? "True" : "False"),
        footer: 'Admin',
        enableEditing: false,                
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
    data={userList}     
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
        onClick={() => navigate('/createUser')}
        variant="contained"
      >
        Create New User
      </Button>       
    )}    
    />
  </>
  ); 
}

export default Users;
