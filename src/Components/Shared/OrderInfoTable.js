import React from 'react';
import { Table } from 'react-bootstrap';

const OrderInfoTable = ({ order }) => {
   const { username, email, product_name, product_price,
      order_quantity, total_price, payment, TxId, _id, phone, zip, village, district, country, product_id } = order;
   return (
      <Table striped bordered hover size="sm">
         <thead>
            <tr>
               <th>Order</th>
               <td>Information</td>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th>Order Id</th>
               <td>{_id}</td>
            </tr>
            <tr>
               <th>Product Id</th>
               <td>{product_id}</td>
            </tr>
            <tr>
               <th>Product Name</th>
               <td>{product_name}</td>
            </tr>
            <tr>
               <th>Order Quantity</th>
               <td>{order_quantity} &nbsp;Pics</td>
            </tr>
            <tr>
               <th>Payment Status</th>
               <td>{payment}</td>
            </tr>
            <tr>
               <th>Transaction Id</th>
               <td>{TxId || "Not Payment Yet"}</td>
            </tr>
            <tr>
               <th>Product Price</th>
               <td>{product_price}$</td>
            </tr>
            <tr>
               <th>Total Price</th>
               <td>{total_price}$</td>
            </tr>
            <tr>
               <th>Customer Name</th>
               <td>{username}</td>
            </tr>
            <tr>
               <th>Customer Email</th>
               <td>{email}</td>
            </tr>
            <tr>
               <th>Customer Phone</th>
               <td>{phone}</td>
            </tr>
            <tr>
               <th>Customer Address</th>
               <td>Village : {village} < br /> District : {district} < br /> Country : {country} < br />  Zip :{zip}</td>
            </tr>
         </tbody>
      </Table>
   );
};

export default OrderInfoTable;