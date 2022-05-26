import React, { useState } from 'react';
import { Badge, Dropdown, DropdownButton, InputGroup, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import AlertModal from '../../../Components/Shared/CustomModal/AlertModal';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { auth } from '../../../firebase.init';
import { useMessage } from '../../../Hooks/useMessage';
import OrderStatusModal from '../Modal/OrderStatusModal';

const MyOrders = () => {
   const [user] = useAuthState(auth);
   const { msg, setMessage } = useMessage();
   const [orderDeleteModal, setOrderDeleteModal] = useState(false);
   const [orderStatusModal, setOrderStatusModal] = useState(false);
   const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`https://manufacture-web.herokuapp.com/my-orders/${user?.email}`).then(res => res.json()));
   const [alertShow, setAlertShow] = useState(false);

   if (isLoading) {
      return <Spinner></Spinner>
   };

   let serial = 0;

   const deleteOrderHandler = async (order) => {
      let orderId = order?._id;

      const response = await fetch(`https://manufacture-web.herokuapp.com/delete-my-order/${orderId}`, {
         method: "DELETE"
      });

      const data = await response.json();
      if (data) {
         setMessage(<p><strong className='text-success'>Order Cancelled</strong></p>);
         refetch();
         setOrderDeleteModal(false);
         setAlertShow(true);
      }
   }

   return (
      <div className='section_default'>
         <AlertModal
            alertClose={() => setAlertShow(false)}
            alertShow={alertShow}
            message={msg}
         >
         </AlertModal>
         <div className="container">
            {msg}
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Product</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Order Qty</th>
                     <th>Status</th>
                     <th>Total Price</th>
                     <th>Payment</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     orders ? orders.map((order) => {
                        const { product_name, product_price, product_image, order_quantity, total_price, payment, status } = order;
                        return (
                           <tr key={order._id}>
                              <td>{++serial}</td>
                              <td>
                                 {
                                    <img src={product_image} style={{ width: "60px", height: "60px" }} alt="product_image" />
                                 }
                              </td>
                              <td>{product_name}</td>
                              <td>{product_price}</td>
                              <td>{order_quantity}</td>
                              <td>{status}</td>
                              <td>{total_price}</td>
                              <td>
                                 {
                                    payment === 'paid' ?
                                       <Badge>Paid</Badge> :
                                       <>
                                          <Badge className='text-dark bg-warning' style={{ cursor: "pointer" }} as={Link} to={`/dashboard/payment/${order._id}`}>Payment</Badge>
                                       </>
                                 }
                                 {
                                    payment === 'paid' ?
                                       "" :
                                       <>
                                          <Badge className='mx-2 bg-danger btn btn-sm text-light' onClick={() => setOrderDeleteModal(true && order)}>Cancel</Badge>
                                          <ConfirmModal
                                             okConfirm={deleteOrderHandler}
                                             confirmShow={orderDeleteModal}
                                             message={(`Want to cancel this order ${orderDeleteModal?.product_name}`)}
                                             cancelConfirm={() => setOrderDeleteModal(false)}
                                          />
                                       </>
                                 }
                              </td>
                              <td>
                                 <InputGroup>
                                    <DropdownButton
                                       title=''
                                       variant="outline-secondary"
                                       id="input-group-dropdown-1"
                                    >
                                       <Dropdown.Item onClick={() => setOrderStatusModal(true && order)} >Details</Dropdown.Item>
                                    </DropdownButton>
                                 </InputGroup>
                                 <OrderStatusModal
                                    closeModal={() => setOrderStatusModal(false)}
                                    order={orderStatusModal}
                                 ></OrderStatusModal>
                              </td>
                           </tr>
                        )
                     }) : <tr><td>No Orders Found</td></tr>
                  }
               </tbody>
            </Table>
         </div>
      </div>
   );
};

export default MyOrders;