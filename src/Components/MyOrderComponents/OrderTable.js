import React, { useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMessage } from '../../Hooks/useMessage';
import ConfirmModal from '../Shared/CustomModal/ConfirmModal';
import Spinner from '../Shared/Spinner/Spinner';

const OrderTable = ({ orders, refetch, setMessage }) => {
   const [orderDeleteModal, setOrderDeleteModal] = useState(false);

   let serial = 0;

   const makePaymentHandler = async (order) => {

   }

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
      <Table striped responsive>
         <thead>
            <tr>
               <th>#</th>
               <th>Name</th>
               <th>Total Price</th>
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
                  const { username, email, product_id, product_name, product_price, order_quantity, total_price, paid, status } = order;
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
                              paid === 'paid' ?
                                 <Badge>Paid</Badge> :
                                 <>
                                    <Badge as={Link} to={`/dashboard/payment/${order._id}`} style={{ cursor: 'pointer' }}>Payment</Badge>
                                 </>
                           }
                        </td>
                        <td>
                           {
                              paid === 'paid' ?
                                 <Badge>Paid</Badge> :
                                 <>
                                    <Badge onClick={() => setOrderDeleteModal(true && order)} style={{ cursor: 'pointer' }}>Cancel</Badge>
                                    <ConfirmModal
                                       okConfirm={deleteOrderHandler}
                                       confirmShow={orderDeleteModal}
                                       message={(`Want to cancel this order ${orderDeleteModal?.orderInformation?.product_name}`)}
                                       cancelConfirm={() => setOrderDeleteModal(false)}
                                    />
                                 </>
                           }
                        </td>
                     </tr>
                  )
               }) : <tr><td>No Orders Found</td></tr>
            }
         </tbody>
      </Table>
   );
};

export default OrderTable;