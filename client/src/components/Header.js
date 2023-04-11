import * as React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { CurrentAuthContext } from '../App';
import logout from "../utils/logoutFunction";

const Header = () => {  
const value = React.useContext(CurrentAuthContext);
  if(value) {
    return (    
      <header>   
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>         
          <Navbar.Brand as={Link} to="/">Clockwise Clockware</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"  activeKey={window.location.pathname}>
              <Nav.Item>           
                <Nav.Link className="link" as={Link} to="/orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>                    
                <Nav.Link className="link" as={Link} to="/users" >Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>                     
                <Nav.Link className="link" as={Link} to="/masters" >Masters</Nav.Link>
              </Nav.Item>
              <Nav.Item>                
                <Nav.Link className="link" as={Link} to="/cities" >Cities</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="link" as={Link} to="/clocks" >Clocks</Nav.Link>              
              </Nav.Item>   
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
                <Nav.Link as={Link} to="/login">Login</Nav.Link>       
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default Header;
