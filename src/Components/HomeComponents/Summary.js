import { faCartPlus, faFlag, faHammer, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Summary.css';


const Summary = ({ productLength, userLength, orderLength, countryLength }) => {
   return (
      <div className='section_default'>
         <div className="container">
            <h3 className="section_title">
               <p>Know about our Business</p>
               Our Business Statics
            </h3>
            <div className="row">
               <div className="col-lg-3 text-center">
                  <div className="p-3">
                     <div className=' d-flex align-items-center justify-content-center'>
                        <div className="fs-1" style={{ width: "100px" }}>
                           <FontAwesomeIcon icon={faHammer}></FontAwesomeIcon>
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="fw-bold fs-4">
                           <span>{productLength}+ Products</span>
                        </div>
                        <p>We are making {productLength} types of products </p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3  text-center">
                  <div className="p-3">
                     <div className=' d-flex align-items-center justify-content-center'>
                        <div className="fs-1" style={{ width: "100px" }}>
                           <FontAwesomeIcon icon={faUsersLine}></FontAwesomeIcon>
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="fw-bold fs-4">
                           <span>{userLength}+ Clients</span>
                        </div>
                        <p>{userLength} Plus clients from {countryLength} Countries</p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3  text-center">
                  <div className="p-3">
                     <div className=' d-flex align-items-center justify-content-center'>
                        <div className="fs-1" style={{ width: "100px" }}>
                           <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="fw-bold fs-4">
                           <span>{orderLength}+ Orders</span>
                        </div>
                        <p>All world wide {orderLength}+ Orders Completed</p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3  text-center">
                  <div className="p-3">
                     <div className=' d-flex align-items-center justify-content-center'>
                        <div className="fs-1" style={{ width: "100px" }}>
                           <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
                        </div>
                     </div>
                     <div className="p-2">
                        <div className="fw-bold fs-4">
                           <span>{countryLength}+ Countries</span>
                        </div>
                        <p>Our Business in all over the world</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Summary;