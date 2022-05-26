import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductInfoTable from '../../../Components/DashboardComponents/ProductInfoTable';

const ProductStatusModal = ({ product, closeModal }) => {
   return (
      <Modal show={product} onHide={closeModal}>
         <Modal.Body>
            <ProductInfoTable product={product}></ProductInfoTable>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ProductStatusModal;