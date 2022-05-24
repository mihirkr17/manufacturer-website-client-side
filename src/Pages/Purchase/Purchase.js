import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../Components/PurchaseComponents/ProductDetail';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';

const Purchase = () => {
   const { productId } = useParams();
   const [user] = useAuthState(auth);

   const { data: product, isLoading, refetch } = useQuery('product', () => fetch(`http://localhost:5000/products/${productId}`).then(res => res.json()));

   isLoading && <Spinner></Spinner>;

   return (
      <div>
         <ProductDetail product={product} refetch={refetch} user={user} productId={productId} loading={isLoading}></ProductDetail>
      </div>
   );
};

export default Purchase;