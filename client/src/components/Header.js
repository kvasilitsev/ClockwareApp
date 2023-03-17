import * as React from "react";
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
          <Navbar.Brand href="/">Clockwise Clockware</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"  activeKey={window.location.pathname}>
              <Nav.Item>           
                <Nav.Link className="link" href="/orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>                    
                <Nav.Link className="link" href="/users" >Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>                     
                <Nav.Link className="link" href="/masters" >Masters</Nav.Link>
              </Nav.Item>
              <Nav.Item>                
                <Nav.Link className="link" href="/cities" >Cities</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="link" href="/clocks" >Clocks</Nav.Link>              
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
