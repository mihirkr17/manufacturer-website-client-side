import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';

import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.init';
import './Footer.css';

const Footer = () => {
   const date = new Date();
   const newDate = date.getFullYear();

   return (
      <footer className='footer__section'>
         <div className="container">

            <div className="footer_top row text-dark w-75">
               <div className="col-lg-6 d-flex align-items-center justify-content-center">
                  <span>Subscribe To Our Newsletter</span>
               </div>
               <div className="col-lg-6">
                  <div className="row">
                     <div className="col-lg-8 text-end">
                        <input type="text" className='form-control' />
                     </div>
                     <div className="col-lg-4 text-center">
                        <button className='btn btn-warning'>Subscribe</button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="row py-5">
               <div className="col-lg-3">
                  <h4>Carpent-Factory</h4>
                  <address className='d-flex mt-3 flex-column'>
                     <small className='mb-3'>
                        <strong>Address :</strong>&nbsp;
                        <i>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</i>
                     </small>
                     <small className='mb-3'>
                        <strong>Phone :</strong>&nbsp;
                        <i>(000) 123-456789</i>
                     </small>
                     <small className='mb-3'>
                        <strong>Fax :</strong>&nbsp;
                        <i>(000) 123-456789</i>
                     </small>
                  </address>
               </div>

               <div className="col-lg-3">
                  <h4>Help</h4>
                  <div className='d-flex mt-3 flex-column'>
                     <small>Search</small>
                     <small>Terms Of Service</small>
                     <small>Information</small>
                     <small>Privacy Policy</small>
                     <small>Term And Condition</small>
                  </div>
               </div>

               <div className="col-lg-3">
                  <h4>Links</h4>
                  <div className='d-flex mt-3 flex-column'>
                     <small><Link to='/'>Home</Link></small>
                     <small><Link to='/blog'>Blog</Link></small>
                     <small><Link to='/dashboard'>My Profile</Link></small>
                     <small onClick={() => signOut(auth)}>My Profile</small>
                  </div>
               </div>
               <div className="col-lg-3">
                  <h4>Information</h4>
                  <ul>
                     <li>Search Terms</li>
                  </ul>
               </div>
              
            </div>
            <div className="footer_bottom py-2 d-flex align-items-center justify-content-between">
               <p>
                  Carpent-Factory &copy; {newDate}
               </p>
               <ul className='d-flex'>
                  <li>
                     <a href="http://" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                     </a>
                  </li>
                  <li>
                     <a href="http://" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                     </a>
                  </li>
                  <li>
                     <a href="http://" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   );
};

export default Footer;