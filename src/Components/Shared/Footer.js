import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import './Footer.css';

const Footer = () => {
   const date = new Date();
   const newDate = date.getFullYear();
   return (
      <footer className='footer__section'>
         <div className="container">
            <div className="row py-5">
               <div className="col-lg-3">
                  <h4>Carpen-Factory</h4>
                  <p>
                     Condimentum adipiscing vel neque dis nam parturient orci at
                     scelerisque neque dis nam parturient.
                  </p>
                  <address>
                     <p>
                        <strong>Address :</strong>
                        <i>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</i>
                     </p>
                     <p>
                        <strong>Phone :</strong>
                        <i>(000) 123-456789</i>
                     </p>
                     <p>
                        <strong>Fax :</strong>
                        <i>(000) 123-456789</i>
                     </p>
                  </address>
               </div>

               <div className="col-lg-3">
                  <h4>Help</h4>
                  <ul>
                     <li>Search</li>
                     <li>Terms Of Service</li>
                     <li>Information</li>
                     <li>Privacy Policy</li>
                     <li>Term And Condition</li>
                  </ul>
               </div>
               <div className="col-lg-3">
                  <h4>Information</h4>
                  <ul>
                     <li>Search Terms</li>
                  </ul>
               </div>
               <div className="col-lg-3">
                  <h4>Support</h4>
                  <ul>
                     <li>Contact</li>
                     <li>About</li>
                     <li>Blog</li>
                     <li>Delivery</li>
                  </ul>
               </div>
            </div>
            <div className="footer_bottom py-2 d-flex align-items-center justify-content-between">
               <p>
                  Carpen-Factory &copy; {newDate}
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