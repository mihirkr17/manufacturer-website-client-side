import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './AlertModal.css';

const AlertModal = ({ alertClose, alertShow, message }) => {
   return (
      <>
         <Modal show={alertShow} onHide={alertClose} className='alertModal'>
            <Modal.Body>
               <div className="row">
                  <div className="col-12 text-center">
                     {message}
                  </div>
                  <div className="col-12 text-center pt-3">
                     <Button variant="secondary" onClick={alertClose}>
                        Close
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default AlertModal;