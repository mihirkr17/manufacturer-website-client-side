import React, { useState } from 'react';
import { Badge, Dropdown, DropdownButton, InputGroup, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
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
   const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/my-orders/${user?.email}`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>
   };

   let serial = 0;

   const deleteOrderHandler = async (order) => {
      let orderId = order?._id;

      const response = await fetch(`http://localhost:5000/delete-my-order/${orderId}`, {
         method: "DELETE"
      });

      const data = await response.json();
      if (data) {
         setMessage(<p><strong className='text-success'>Order Cancelled</strong></p>);
         refetch();
         setOrderDeleteModal(false);
      }
   }

   return (
      <div className='section_default'>
         <div className="container">
            {msg}
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
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
                        const { product_name, product_price, order_quantity, total_price, payment, status } = order;
                        return (
                           <tr key={order._id}>
                              <td>{++serial}</td>
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
                                          <Badge className='bg-warning' as={Link} to={`/dashboard/payment/${order._id}`} style={{ cursor: 'pointer' }}>Payment</Badge>
                                       </>
                                 }
                                 {
                                    payment === 'paid' ?
                                       "" :
                                       <>
                                          <Badge className='mx-2 bg-danger' onClick={() => setOrderDeleteModal(true && order)} style={{ cursor: 'pointer' }}>Cancel</Badge>
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