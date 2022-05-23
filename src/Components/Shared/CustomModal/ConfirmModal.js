import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ConfirmModal.css';

const ConfirmModal = ({ okConfirm, cancelConfirm, confirmShow, message, data }) => {
   return (
      <>
         <Modal show={confirmShow} onHide={cancelConfirm} className='confirmModal'>
            <Modal.Body>
               <div className="row">
                  <div className="col-12 text-center">
                     {message}
                  </div>
                  <div className="col-12 text-center pt-3">
                     <Button variant="primary" onClick={() => okConfirm(data)}>
                        Confirm
                     </Button>
                     <Button variant="danger" onClick={cancelConfirm}>
                        Cancel
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ConfirmModal;