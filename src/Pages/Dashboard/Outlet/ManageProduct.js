import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';

const ManageProduct = () => {
   const { data: products, isLoading, refetch } = useQuery('products', () => fetch(`http://localhost:5000/products`).then(res => res.json()));

   isLoading && <Spinner></Spinner>

   let serial = 0;
   return (
      <div className='section_default'>
         <div className="container">
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Qty</th>
                     <th>Payment</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     products ? products.map((product) => {
                        const {_id, name, description, price, quantity } = product;
                        return (
                           <tr key={_id}>
                              <td>{++serial}</td>
                              <td>{name}</td>
                              <td>{price}$</td>
                              <td>{quantity}</td>
                              
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

export default ManageProduct;