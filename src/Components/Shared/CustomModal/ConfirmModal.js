import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ConfirmModal.css';

const ConfirmModal = ({ okConfirm, cancelConfirm, confirmShow, message }) => {
   return (
      <Modal show={confirmShow} className='confirmModal'>
         <Modal.Body>
            <div className="row">
               <div className="col-12 text-center">
                  {message}
               </div>
               <div className="col-12 text-center py-3">
                  <Button variant="primary" className='mx-3' onClick={() => okConfirm(confirmShow)}>
                     Confirm
                  </Button>
                  <Button variant="danger" className='mx-3' onClick={cancelConfirm}>
                     Cancel
                  </Button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
};

export default ConfirmModal;