import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase.init';


const NavigationBar = () => {
   const [user] = useAuthState(auth);

   return (
      <Navbar bg="light" sticky='top' expand="lg">
         <Container>
            <Navbar.Brand href="#home">Carpen-Factory</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/about">About</Nav.Link>
               </Nav>
               <Nav>
                  {user ? <>
                     <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                     <button className="btn btn-danger" onClick={() => signOut(auth)} >
                        Sign Out
                     </button></> : <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default NavigationBar;