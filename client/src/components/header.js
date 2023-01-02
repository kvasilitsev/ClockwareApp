import * as React from "react";
import { Navbar, Nav, Container,  NavDropdown } from 'react-bootstrap';
import { CurrentAuthContext } from '../App';
const Header = () => {
  const value = React.useContext(CurrentAuthContext);  
  console.log(value);
  if(value) {
    return (    
      <header>   
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Clockwise Clockware</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">            
              <NavDropdown title="Orders" id="basic-nav-dropdown" >
                <NavDropdown.Item eventKey="1.1" >Create order</NavDropdown.Item>
                <NavDropdown.Item eventKey="1.2">Find all orders</NavDropdown.Item>
                <NavDropdown.Item eventKey="1.3">Find order by master</NavDropdown.Item>
                <NavDropdown.Item eventKey="1.3">Find order by user</NavDropdown.Item>
                <NavDropdown.Item eventKey="1.4">Edit order</NavDropdown.Item>
                <NavDropdown.Item eventKey="1.5">Delete order</NavDropdown.Item>
                </NavDropdown>
              <NavDropdown title="Users" id="nav-dropdown">
                <NavDropdown.Item eventKey="2.1">Create user</NavDropdown.Item>
                <NavDropdown.Item eventKey="2.2">Find all users</NavDropdown.Item>
                <NavDropdown.Item eventKey="2.3">Find user by email</NavDropdown.Item>
                <NavDropdown.Item eventKey="2.4">Edit user</NavDropdown.Item>
                <NavDropdown.Item eventKey="2.5">Delete user</NavDropdown.Item>        
              </NavDropdown>
              <NavDropdown title="Masters" id="nav-dropdown">
                <NavDropdown.Item eventKey="3.1">Create master</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.2">Find all masters</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.3">Find master by id</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.4">Find master by city</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.5">Add city for master</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.6">Edit master</NavDropdown.Item>
                <NavDropdown.Item eventKey="3.7">Delete master</NavDropdown.Item>        
              </NavDropdown>
              <NavDropdown title="Cities" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Create city</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">Find all cities</NavDropdown.Item>        
                <NavDropdown.Item eventKey="4.3">Edit city</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.4">Delete city</NavDropdown.Item>        
              </NavDropdown>
              <NavDropdown title="Clocks" id="nav-dropdown">
                <NavDropdown.Item eventKey="5.1">Add new clock size</NavDropdown.Item>
                <NavDropdown.Item eventKey="5.2">Edit clock</NavDropdown.Item>        
                <NavDropdown.Item eventKey="5.3">Delete clock</NavDropdown.Item>            
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">            
              <Nav.Link href="/logout">Logout</Nav.Link>       
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
    </header>
    )
  } else {
    return (    
      <header>    
        <Navbar bg="dark" variant='dark' expand="lg">
          <Container>        
            <Navbar.Brand href="/">Clockwise Clockware</Navbar.Brand>        
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>       
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default Header;

  // return (    
  // <header>    
  //   <Navbar bg="dark" variant='dark' expand="lg">
  //     <Container>        
  //       <Navbar.Brand href="/">Clockwise Clockware</Navbar.Brand>        
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="ms-auto">
  //           <Nav.Link href="#about">About</Nav.Link>
  //           <Nav.Link href="/login">Login</Nav.Link>       
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // </header>
  //   )