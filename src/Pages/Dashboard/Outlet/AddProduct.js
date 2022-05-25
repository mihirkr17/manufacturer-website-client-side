import React from 'react';
import { Button, Col, FloatingLabel, Form, FormLabel, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SpinnerBtn from '../../../Components/Shared/SpinnerBtn';

const imgBB = '29b495447faaf14fd124392c33bdfb50';

const AddProduct = () => {
   // const { register, formState: { errors }, handleSubmit } = useForm();

   const addProductHandler = async (e) => {
      e.preventDefault();
      let name = e.target.name.value;
      let description = e.target.description.value;
      let material = e.target.material.value;
      let price = e.target.price.value;
      let quantity = e.target.quantity.value;
      let min_order_quantity = e.target.min_order_quantity.value;
      let image = e.target.image.files[0];

      let formData = new FormData();
      formData.append('image', image);

      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBB}`, {
         method: "POST",
         mode: 'no-cors',
         body: formData
      });

      const data = await imgRes.json();
      console.log(data);

   }
   return (
      <div className='section_default'>
         <div className="container">
            <Form onSubmit={addProductHandler} encType='multipart/form-data'>
               <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="formGridName">
                     <Form.Label>Product Name</Form.Label>
                     <Form.Control type="text" name='name' placeholder="Enter product name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Product Description</Form.Label>
                     <Form.Control as="textarea" name='description' rows={3} />
                  </Form.Group>
               </Row>

               {/* <Form.Group className="mb-3" controlId="formGridImage">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control name='image' type='text' placeholder="http://url/" />
               </Form.Group> */}

               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridMaterial">
                     <Form.Label>Material</Form.Label>
                     <Form.Control type='text' name='material' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrice">
                     <Form.Label>Price</Form.Label>
                     <Form.Control type='number' name='price' />
                  </Form.Group>
               </Row>
               <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridQuantity">
                     <Form.Label>Quantity</Form.Label>
                     <Form.Control type='number' name='quantity' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMinQuantity">
                     <Form.Label>Minimum Order Quantity</Form.Label>
                     <Form.Control type='number' name='min_order_quantity' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMinQuantity">
                     <Form.Label>Select Image</Form.Label>
                     <Form.Control type='file' name='image' />
                  </Form.Group>
               </Row>

               <Button variant="primary" type="submit">
                  Add Product
               </Button>
            </Form>
         </div>
      </div>
   );
};

export default AddProduct;