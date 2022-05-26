import React from 'react';
import { Table } from 'react-bootstrap';

const ProductInfoTable = ({ product }) => {
   const { _id, name, image, description, min_order_quantity, availability, material, quantity, price } = product ? product : {};
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
               <th>Product Image</th>
               <td className='d-flex align-items-center justify-content-center'>
                  <img style={{ width: "200px" }} src={image} alt="" />
               </td>
            </tr>
            <tr>
               <th>Product Id</th>
               <td>{_id}</td>
            </tr>
            <tr>
               <th>Product Name</th>
               <td>{name}</td>
            </tr>
            <tr>
               <th>Quantity</th>
               <td>{quantity} &nbsp;Pics</td>
            </tr>
            <tr>
               <th>Price</th>
               <td>{price}$</td>
            </tr>
            <tr>
               <th>Minimum Order Quantity</th>
               <td>{min_order_quantity}</td>
            </tr>
            <tr>
               <th>Material</th>
               <td>{material}</td>
            </tr>
            <tr>
               <th>Availability</th>
               <td>{availability}</td>
            </tr>
            <tr>
               <th>Description</th>
               <td>{description}</td>
            </tr>
         </tbody>
      </Table>
   );
};

export default ProductInfoTable;