import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';

const ProductDetail = ({ product, refetch, isLoading, user }) => {
   isLoading && <Spinner></Spinner>
   const { name, description, price, quantity, image, min_order_quantity, material, availability, _id } = product ? product : {};
   const [orderQuantity, setOrderQuantity] = useState(min_order_quantity);
   const [disable, setDisable] = useState(null);
   const [msg, setMessage] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      if (orderQuantity < min_order_quantity) {
         setDisable(e => !e);
         setMessage(<p> <strong className='text-danger'>Minimum {min_order_quantity} pieces required for place an order!</strong> </p>);
      } else if (orderQuantity > quantity) {
         setDisable(e => !e);
         setMessage(<p> <strong className='text-danger'>You can not place this order because selected quantity is greater than available quantity!</strong> </p>);
      } else {
         setMessage('');
      }

      return () => {
         setDisable(false);
      }
   }, [min_order_quantity, orderQuantity, quantity]);

   // order handler to submit order
   const orderHandler = async (e) => {
      e.preventDefault();
      let username = e.target.username.value;
      let email = e.target.email.value;
      let village = e.target.village.value;
      let district = e.target.district.value;
      let country = e.target.country.value;
      let zip = e.target.zip.value;
      let phone = e.target.phone.value;
      let order_quantity = parseInt(orderQuantity) || parseInt(min_order_quantity);
      let product_id = _id;
      let product_price = parseInt(price);
      let product_name = name;

      let total_price = parseInt(price) * order_quantity;
      let available_quantity = parseInt(quantity) - order_quantity;

      let userInformation = { username, email, phone, village, district, country, zip }
      let orderInformation = { product_id, product_name, product_price, order_quantity, available_quantity, total_price }

      let orderList = { userInformation, orderInformation };

      const response = await fetch(`http://localhost:5000/orders/${product_id}`, {
         method: "POST",
         headers: {
            "content-type": "application/json"
         },
         body: JSON.stringify(orderList)
      });

      if (response.ok) {
         const data = await response.json();
         if (data) {
            refetch();
            navigate('/dashboard/my-order');
         }
      }
   }

   // clear warning message after 4 seconds;
   useEffect(() => {
      const messageTimeout = setTimeout(() => {
         setMessage("");
      }, 4000);
      return () => clearInterval(messageTimeout);
   }, [msg]);


   return (
      <div className='product_details card_default'>
         <div className="container">
            <div className="row">
               <div className="col-lg-5">
                  <div className="d-flex align-items-center justify-content-center">
                     <img src={image} className='w-75' alt="product-img" />
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="p-4">
                     <h5>{name}</h5>
                     <p><strong>Price :</strong> {price}</p>
                     <p><strong>Material : </strong> {material}</p>
                     <p><strong>Quantity : </strong> {quantity}</p>
                     <p><strong>Availability : </strong> {availability === true ? "In stock!" : "Out Of Stock"}</p>
                     <p><strong>Description :</strong> {description}</p>
                  </div>
                  <div className="purchase_form p-3 shadow rounded-4">
                     {msg}
                     <Form onSubmit={orderHandler}>
                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="formGridMinOrder">
                              <Form.Label>Minimum Orders</Form.Label>
                              <Form.Control defaultValue={min_order_quantity || ''} key={min_order_quantity} disabled />
                           </Form.Group>

                           <Form.Group as={Col} controlId="formGridOrderQuantity">
                              <Form.Label>Order Quantity</Form.Label>
                              <Form.Control type="number" name='orderQuantity' key={min_order_quantity} defaultValue={min_order_quantity || ''} onChange={(e) => setOrderQuantity(e.target.value)} />
                           </Form.Group>
                        </Row>

                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" name='email' defaultValue={user?.email} disabled />
                           </Form.Group>

                           <Form.Group as={Col} controlId="formGridUsername">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" name='username' defaultValue={user?.displayName || ''} />
                           </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                           <Form.Label>Village</Form.Label>
                           <Form.Control type="text" name='village' placeholder="1234 Main St" />
                        </Form.Group>

                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>District</Form.Label>
                              <Form.Control type='text' name='district' />
                           </Form.Group>

                           <Form.Group as={Col} controlId="formGridCountry">
                              <Form.Label>Country</Form.Label>
                              <Form.Control type='text' name='country' />
                           </Form.Group>

                           <Form.Group as={Col} controlId="formGridZip">
                              <Form.Label>Zip</Form.Label>
                              <Form.Control type='text' name='zip' />
                           </Form.Group>

                           <Form.Group controlId="formGridPhone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type='number' name='phone' />
                           </Form.Group>
                        </Row>

                        <Button variant="primary" disabled={disable === true ? true : false} type="submit">
                           Purchase
                        </Button>
                     </Form>
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default ProductDetail;