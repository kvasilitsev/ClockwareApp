// import { Nav, NavDropdown } from 'react-bootstrap';

// function AdminMenu() {
//   return (
//     <Nav className="adminMenu bg-dark variant-dark expand-lg">     
//       <NavDropdown title="Orders" id="dropdown" >
//         <NavDropdown.Item eventKey="1.1" >Create order</NavDropdown.Item>
//         <NavDropdown.Item eventKey="1.2">Find all orders</NavDropdown.Item>
//         <NavDropdown.Item eventKey="1.3">Find order by master</NavDropdown.Item>
//         <NavDropdown.Item eventKey="1.3">Find order by user</NavDropdown.Item>
//         <NavDropdown.Item eventKey="1.4">Edit order</NavDropdown.Item>
//         <NavDropdown.Item eventKey="1.5">Delete order</NavDropdown.Item>
//       </NavDropdown>
//       <NavDropdown title="Users" id="nav-dropdown">
//         <NavDropdown.Item eventKey="2.1">Create user</NavDropdown.Item>
//         <NavDropdown.Item eventKey="2.2">Find all users</NavDropdown.Item>
//         <NavDropdown.Item eventKey="2.3">Find user by email</NavDropdown.Item>
//         <NavDropdown.Item eventKey="2.4">Edit user</NavDropdown.Item>
//         <NavDropdown.Item eventKey="2.5">Delete order</NavDropdown.Item>        
//       </NavDropdown>
//       <NavDropdown title="Masters" id="nav-dropdown">
//         <NavDropdown.Item eventKey="3.1">Create master</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.2">Find all masters</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.3">Find master by id</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.4">Find master by city</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.5">Add city for master</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.6">Edit user</NavDropdown.Item>
//         <NavDropdown.Item eventKey="3.7">Delete order</NavDropdown.Item>        
//       </NavDropdown>
//       <NavDropdown title="Cities" id="nav-dropdown">
//         <NavDropdown.Item eventKey="4.1">Create city</NavDropdown.Item>
//         <NavDropdown.Item eventKey="4.2">Find all cities</NavDropdown.Item>        
//         <NavDropdown.Item eventKey="4.3">Edit user</NavDropdown.Item>
//         <NavDropdown.Item eventKey="4.4">Delete order</NavDropdown.Item>        
//       </NavDropdown>
//       <NavDropdown title="Clocks" id="nav-dropdown">
//         <NavDropdown.Item eventKey="5.1">Add new clock size</NavDropdown.Item>
//         <NavDropdown.Item eventKey="5.2">Edit clock</NavDropdown.Item>        
//         <NavDropdown.Item eventKey="5.3">Delete clock</NavDropdown.Item>            
//       </NavDropdown>
//       <Nav.Item className="ms-auto">
//         <Nav.Link href="/logout">Logout</Nav.Link>
//       </Nav.Item> 
//     </Nav>
//   );
// }

// export default AdminMenu;

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function AdminMenu() {
  return (
    <div className="mb-2">      
      <DropdownButton  variant="dark" title="Orders" drop="end">        
          <Dropdown.Item href="#/action-1">Create order</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Find all orders</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Find orders by master</Dropdown.Item>          
          <Dropdown.Item href="#/action-4">Find orders by user</Dropdown.Item>         
          <Dropdown.Item href="#/action-5">Edit order</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Delete order</Dropdown.Item>               
      </DropdownButton>      
      <DropdownButton variant="secondary" title="Users" drop="end">
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1">Create user</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Find all users</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Find user by email</Dropdown.Item>          
          <Dropdown.Item href="#/action-4">Edit user</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Delete user</Dropdown.Item>          
        </Dropdown.Menu>
      </DropdownButton> 
      <DropdownButton variant="secondary" title="Masters">
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1">Create master</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Find all masters</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Find master by id</Dropdown.Item>          
          <Dropdown.Item href="#/action-4">Find master by city</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Add city for master</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Edit master</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Delete master</Dropdown.Item>
        </Dropdown.Menu>
      </DropdownButton>
      <DropdownButton variant="secondary" title="Cities">        
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1" active>Create city</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Find all cities</Dropdown.Item>                  
          <Dropdown.Item href="#/action-3">Edit city</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Delete city</Dropdown.Item>          
        </Dropdown.Menu>
      </DropdownButton>
      <DropdownButton variant="secondary" title="Clocks">
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1" active>Add new clockssize</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Edit clock</Dropdown.Item>                  
          <Dropdown.Item href="#/action-3">Delete clock</Dropdown.Item>                   
        </Dropdown.Menu>
      </DropdownButton>
    </div>
  );
}

export default AdminMenu;