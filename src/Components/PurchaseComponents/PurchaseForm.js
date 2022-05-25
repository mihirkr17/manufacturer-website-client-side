import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SpinnerBtn from '../Shared/SpinnerBtn';

const PurchaseForm = ({ product, refetch, user }) => {

   const { name, description, price, quantity, image, min_order_quantity, material, availability, _id } = product ? product : {};
   const [orderQuantity, setOrderQuantity] = useState(min_order_quantity || 0);
   const [disable, setDisable] = useState(false);
   const [msg, setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (orderQuantity < min_order_quantity) {
         setDisable(e => !e);
         setMessage(<p> <strong className='text-danger'>Minimum {min_order_quantity} pieces required for place an order!</strong> </p>);
      } else if (orderQuantity > quantity) {
         setDisable(e => !e);
         setMessage(<p> <strong className='text-danger'>You can not place this order because selected quantity is greater than available quantity!</strong> </p>);
      } else {
         setDisable(false);
      }

      return () => {
         setDisable(false);
         setMessage('');
      }
   }, [min_order_quantity, orderQuantity, quantity]);


   // order handler to submit order
   const purchaseHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
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
      let status = "pending";
      let payment = 'unpaid';

      let total_price = parseInt(price) * order_quantity;

      let orderInformation = { product_id, product_name: name, product_image: image, product_price, order_quantity, total_price, status, payment, username, email, phone, village, district, country, zip }

      if (username === '' || village === '' || district === '' || country === '' || zip === '' || phone === '') {
         setMessage(<p> <strong className='text-danger'>Please fill out all fields!</strong> </p>);
         setLoading(false);
      } else {
         const response = await fetch(`http://localhost:5000/orders/${product_id}`, {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify(orderInformation)
         });

         if (response.ok) {
            const data = await response.json();
            if (data) {
               setLoading(false);
               refetch();
               navigate('/dashboard/my-order');
            }
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
      <div className='product_details section_default'>
         <div className="container">
            <div className="row">
               <div className="col-lg-7">
                  <div className="row p-3 shadow h-100 rounded">
                     <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
                        <img src={image} className='w-75' alt="product-img" />
                     </div>
                     <div className="col-lg-6 col-md-12">
                        <h5 className='py-3 text-center'>Product Information</h5>
                        <div className="p-4">
                           <h6 className='fw-bold'>{name}</h6>
                           <p><small>Price :</small> {price}</p>
                           <p><small>Material : </small> {material}</p>
                           <p><small>Quantity : </small> {quantity}</p>
                           <p><small>Availability : </small> {availability}</p>
                           <p><small>Description :</small> {description}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="purchase_form p-3 shadow rounded">
                     {msg}
                     <Form onSubmit={purchaseHandler} >
                        <h5 className='py-3 text-center'>Purchase Here</h5>
                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="formGridMinOrder">
                              <Form.Label>Minimum Orders</Form.Label>
                              <Form.Control defaultValue={min_order_quantity} key={min_order_quantity} disabled />
                           </Form.Group>

                           <Form.Group as={Col} controlId="formGridOrderQuantity">
                              <Form.Label>Order Quantity</Form.Label>
                              <Form.Control type="number" name='orderQuantity' key={min_order_quantity} defaultValue={min_order_quantity} onChange={(e) => setOrderQuantity(e.target.value)} />
                           </Form.Group>
                        </Row>

                        <Row className="mb-3">
                           <Form.Group as={Col} controlId="formGridPhone">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type='number' name='phone' />
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
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridEmail">
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="email" name='email' defaultValue={user?.email} disabled />
                        </Form.Group>

                        <Form.Group>
                           <Button variant="primary" className='btn-sm' disabled={disable} type="submit">
                              {loading ? <><SpinnerBtn></SpinnerBtn> purchasing...</> : 'Purchase'}
                           </Button>
                        </Form.Group>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PurchaseForm;