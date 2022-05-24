import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../Components/PurchaseComponents/ProductDetail';
import Spinner from '../../Components/Shared/Spinner/Spinner';

const Purchase = () => {
   const { productId } = useParams();

   const { data: product, isLoading, refetch } = useQuery('product', () => fetch(`http://localhost:5000/products/${productId}`).then(res => res.json()));

   isLoading && <Spinner></Spinner>;

   return (
      <div>
         <ProductDetail product={product} refetch={refetch} loading={isLoading}></ProductDetail>
      </div>
   );
};

export default Purchase;