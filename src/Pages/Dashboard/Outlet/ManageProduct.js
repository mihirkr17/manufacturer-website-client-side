import { faEye, faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import AlertModal from '../../../Components/Shared/CustomModal/AlertModal';
import ConfirmModal from '../../../Components/Shared/CustomModal/ConfirmModal';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { useMessage } from '../../../Hooks/useMessage';
import ProductEditModal from '../Modal/ProductEditModal';
import ProductStatusModal from '../Modal/ProductStatusModal';

const ManageProduct = () => {
   const { data: products, isLoading, refetch } = useQuery('products', () => fetch(`https://manufacture-web.herokuapp.com/products`).then(res => res.json()));
   const [openProduct, setOpenProduct] = useState(false);
   const [deleteProduct, setDeleteProduct] = useState(false);
   const [editProduct, setEditProduct] = useState(false);
   const [alertShow, setAlertShow] = useState(false);
   const { msg, setMessage } = useMessage();

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   // delete product handler
   const deleteProductHandler = async (product) => {
      const { _id } = product;
      const response = await fetch(`https://manufacture-web.herokuapp.com/delete-product/${_id}`, {
         method: "DELETE"
      })

      const data = await response.json();

      if (data) {
         setDeleteProduct(false);
         refetch();
         setAlertShow(true);
         setMessage("Product successfully deleted");
      }
   }

   let serial = 0;
   return (
      <div className='section_default'>
         <AlertModal alertClose={() => setAlertShow(false)} alertShow={alertShow} message={msg}></AlertModal>
         <div className="container">
            <h3 className="section_title">
               Manage All Products
            </h3>
            <p>Total : {products && products.length} Products.</p>
            <Table striped responsive>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     products ? products.map((product) => {
                        const { _id, name, image, price } = product;
                        return (
                           <tr key={_id}>
                              <td>{++serial}</td>
                              <td>
                                 {
                                    <img src={image} style={{ width: "60px", height: "60px" }} alt="" />
                                 }
                              </td>
                              <td>{name}</td>
                              <td>{price}$</td>
                              <td>
                                 <button className='btn mx-1' title='View Product Details' onClick={() => setOpenProduct(true && product)}>
                                    <FontAwesomeIcon icon={faEye} />
                                 </button>
                                 <button className='btn mx-1' title='Update Product' onClick={() => setEditProduct(true && product)}>
                                    <FontAwesomeIcon icon={faPenAlt} />
                                 </button>
                                 <button className='btn mx-1' title='Delete Product' onClick={() => setDeleteProduct(true && product)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                 </button>
                              </td>
                           </tr>
                        )
                     }) : <tr><td>No Products Found</td></tr>
                  }
               </tbody>

               <ConfirmModal
                  okConfirm={deleteProductHandler}
                  cancelConfirm={() => setDeleteProduct(false)}
                  confirmShow={deleteProduct}
                  message={`Want to delete ${deleteProduct?.name} ? `}
               />

               <ProductEditModal
                  product={editProduct}
                  closeModal={() => setEditProduct(false)}
                  refetch={refetch}
               />

               <ProductStatusModal
                  product={openProduct}
                  closeModal={() => setOpenProduct(false)}
               />
            </Table>
         </div>
      </div>
   );
};

export default ManageProduct;