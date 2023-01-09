import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const Footer = () => {  
    return (      
  <footer>    
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>        
          <Nav className="ms-auto">
            <Nav.Link href="#contact">Contact us</Nav.Link>               
          </Nav>     
      </Container>
    </Navbar>
  </footer>
    )
}

export default Footer;
