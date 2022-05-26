import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useMessage } from '../../../Hooks/useMessage';

const ProductEditModal = ({ product, closeModal, refetch }) => {
   const { msg, setMessage } = useMessage();
   const { _id, name, image, description, min_order_quantity, material, quantity, price } = product;
   const updateProductHandler = async (e) => {
      e.preventDefault();
      let name = e.target.name.value;
      let description = e.target.description.value;
      let material = e.target.material.value;
      let priceValue = e.target.price.value;
      let qty = e.target.quantity.value;
      let mQty = e.target.min_order_quantity.value;
      let newImage = e.target.image.value;
      const price = parseInt(priceValue);
      const quantity = parseInt(qty);
      const min_order_quantity = parseInt(mQty);
      const availability = quantity < min_order_quantity ? 'Out Of Stock' : 'In stock!';

      if (name === '' || description === '' || material === '' || priceValue === '' || qty === '' || mQty === '') {
         setMessage(<p><strong className='text-danger'>Please Fill all input Fields</strong></p>);
      } else {
         const response = await fetch(`https://manufacture-web.herokuapp.com/product-update/${_id}`, {
            method: "PUT",
            headers: {
               'content-type': "application/json"
            },
            body: JSON.stringify({ name, image: newImage, description, material, price, quantity, min_order_quantity, availability })
         });

         const data = await response.json();
         if (data) {
            setMessage(<p><strong className='text-success'>Product updated successfully</strong></p>);
            refetch();
         }
      }

   }
   return (
      <Modal show={product} onHide={closeModal}>
         <Modal.Body>
            <Form onSubmit={updateProductHandler} encType='multipart/form-data'>
               <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="formGridName">
                     <Form.Label>Product Name</Form.Label>
                     <Form.Control type="text" defaultValue={name} name='name' placeholder="Enter product name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Product Description</Form.Label>
                     <Form.Control as="textarea" defaultValue={description} name='description' rows={3} />
                  </Form.Group>
               </Row>

               <Form.Group className="mb-3" controlId="formGridImage">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control name='image' defaultValue={image} type='text' placeholder="http://url/" />
               </Form.Group>

               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridMaterial">
                     <Form.Label>Material</Form.Label>
                     <Form.Control type='text' defaultValue={material} name='material' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrice">
                     <Form.Label>Price</Form.Label>
                     <Form.Control type='number' defaultValue={price} name='price' />
                  </Form.Group>
               </Row>
               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridQuantity">
                     <Form.Label>Quantity</Form.Label>
                     <Form.Control type='number' defaultValue={quantity} name='quantity' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMinQuantity">
                     <Form.Label>Minimum Order Quantity</Form.Label>
                     <Form.Control type='number' defaultValue={min_order_quantity} name='min_order_quantity' />
                  </Form.Group>
               </Row>
               {msg}
               <Button variant="primary" type="submit">
                  Update Product
               </Button>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ProductEditModal;