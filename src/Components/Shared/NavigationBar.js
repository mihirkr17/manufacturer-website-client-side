import { signOut } from 'firebase/auth';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import {auth} from '../../firebase.init';


const NavigationBar = () => {
   const [user] = useAuthState(auth);
   return (
      <Navbar bg="light" expand="lg">
         <Container>
            <Navbar.Brand href="#home">Carpen-Factory</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/about">About</Nav.Link>
               </Nav>
               <Nav>
                  {
                     !user ? <Nav.Link as={NavLink} to="/login">Login</Nav.Link> :
                     <Button onClick={() => signOut(auth)}>Log Out</Button>
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default NavigationBar;