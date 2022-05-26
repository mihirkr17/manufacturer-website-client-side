import React, { useState } from 'react';
import { Badge, Dropdown, DropdownButton, InputGroup, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import AlertModal from '../../../Components/Shared/CustomModal/AlertModal';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { useMessage } from '../../../Hooks/useMessage';
import OrderStatusModal from '../Modal/OrderStatusModal';

const ManageOrders = () => {
   const { data: allOrders, isLoading, refetch } = useQuery('allOrders', () => fetch(`https://manufacture-web.herokuapp.com/all-orders`).then(res => res.json()));
   const [orderStatusModal, setOrderStatusModal] = useState(false);
   const [takeOrder, setTakeOrder] = useState(false);
   const [alertShow, setAlertShow] = useState(false);
   const { msg, setMessage } = useMessage();

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   const takeOrderHandler = async (order) => {
      const { _id, product_id, order_quantity } = order ? order : {};
      const orderInfo = { product_id, order_quantity };

      const response = await fetch(`https://manufacture-web.herokuapp.com/order-confirm/${_id}`, {
         method: "PUT",
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(orderInfo)
      });

      const data = await response.json();
      if (data) {
         refetch();
         setTakeOrder(false);
         setAlertShow(true);
         setMessage("Order Shipped");
      }
   }

   let serial = 0;
   return (
      <div className='section_default'>
         <AlertModal alertClose={() => setAlertShow(false)} alertShow={alertShow} message={msg}></AlertModal>
         <div className="container">
            <h3 className="section_title">
               Manage All Customer Orders
            </h3>
            <p>Total : {allOrders && allOrders.length} Orders.</p>
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Product</th>
                     <th>Name</th>
                     <th>Customer</th>
                     <th>Price</th>
                     <th>Order Qty</th>
                     <th>Total Price</th>
                     <th>Payment</th>
                     <th>Status</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     allOrders ? allOrders.map((order) => {
                        const { username, product_name, product_image, product_price, order_quantity, total_price, payment, status } = order;
                        return (
                           <tr key={order._id}>
                              <td>{++serial}</td>
                              <td>
                                 {
                                    <img src={product_image} style={{ width: "60px", height: "60px" }} alt="product_image" />
                                 }
                              </td>
                              <td>{product_name}</td>
                              <td>{username}</td>
                              <td>{product_price}$</td>
                              <td>{order_quantity}</td>
                              <td>{total_price}</td>
                              <td>{payment}</td>
                              <td>
                                 {
                                    payment === 'paid' && status === "pending" ?
                                       <Badge style={{ cursor: "pointer" }} onClick={() => setTakeOrder(true && order)}>Take Order</Badge> :
                                       status
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
               <ConfirmModal
                  okConfirm={takeOrderHandler}
                  cancelConfirm={() => setTakeOrder(false)}
                  confirmShow={takeOrder}
                  message={"Take Order For " + takeOrder?.product_name + " ?"}
               >
               </ConfirmModal>
            </Table>
         </div>
      </div>
   );
};

export default ManageOrders;