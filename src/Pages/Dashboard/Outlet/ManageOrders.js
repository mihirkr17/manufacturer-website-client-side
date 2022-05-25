import React, { useState } from 'react';
import { Dropdown, DropdownButton, InputGroup, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import OrderStatusModal from '../Modal/OrderStatusModal';

const ManageOrders = () => {
   const { data: allOrders, isLoading, refetch } = useQuery('allOrders', () => fetch(`http://localhost:5000/all-orders`).then(res => res.json()));
   const [orderStatusModal, setOrderStatusModal] = useState(false);

   isLoading && <Spinner></Spinner>

   let serial = 0;
   return (
      <div>
         <div className="container">
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Name</th>
                     <th>Customer</th>
                     <th>Price</th>
                     <th>Order Qty</th>
                     <th>Total Price</th>
                     <th>Payment</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     allOrders ? allOrders.map((order) => {
                        const { username, email, product_name, product_price, order_quantity, total_price, paid } = order;
                        return (
                           <tr key={order._id}>
                              <td>{++serial}</td>
                              <td>{product_name}</td>
                              <td>{username}</td>
                              <td>{product_price}$</td>
                              <td>{order_quantity}</td>
                              <td>{total_price}</td>
                              <td>{paid}</td>
                              <td>
                                 <InputGroup className="mb-3">
                                    <DropdownButton
                                       title=''
                                       variant="outline-secondary"
                                       id="input-group-dropdown-1"
                                    >
                                       <Dropdown.Item onClick={() => setOrderStatusModal(true && allOrders)} >Profile</Dropdown.Item>
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

export default ManageOrders;