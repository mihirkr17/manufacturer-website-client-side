import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase.init';


const NavigationBar = () => {
   const [user] = useAuthState(auth);

   return (
      <Navbar bg="light" sticky='top' className='shadow border-bottom py-3' expand="lg">
         <Container>
            <Navbar.Brand as={NavLink} to="/">Carpen-Factory</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/portfolio">Portfolio</Nav.Link>
                  <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                  {user ? <>
                     <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                     <button className="btn btn-danger btn-sm" onClick={() => signOut(auth)} >
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