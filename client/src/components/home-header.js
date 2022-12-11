import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const HomeHeader = () => {  
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

export default HomeHeader;
