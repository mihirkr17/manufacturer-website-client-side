import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import PurchaseForm from '../../Components/PurchaseComponents/PurchaseForm';

const Purchase = () => {
   const { productId } = useParams();
   const [user] = useAuthState(auth);

   const { data: product, isLoading, refetch } = useQuery('product', () => fetch(`http://localhost:5000/products/${productId}`).then(res => res.json()));

   if (isLoading) {
      return <Spinner></Spinner>;
   }

   return (
      <div>
         <PurchaseForm product={product} refetch={refetch} user={user} productId={productId} loading={isLoading}></PurchaseForm>
      </div>
   );
};

export default Purchase;