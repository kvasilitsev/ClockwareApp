import * as React from "react";
import { Navbar, Nav, Container,  NavDropdown } from 'react-bootstrap';
import { CurrentAuthContext } from '../App';
import logout from "../models/logoutFunction";

const Header = () => {
  const value = React.useContext(CurrentAuthContext);  
  if(value) {
    return (    
      <header>   
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Clockwise Clockware</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/orders">Masters</Nav.Link>
            <Nav.Link href="/orders">Cities</Nav.Link>
            <Nav.Link href="/orders">Clocks</Nav.Link>              
            </Nav>
            <Nav className="ms-auto">            
              <Nav.Link onClick={()=>logout()}>Logout</Nav.Link>       
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
