import React from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';

const OrderStatusModal = ({ order, closeModal }) => {
  
   return (
      <Modal show={order} onHide={closeModal}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {
          
            }
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default OrderStatusModal;