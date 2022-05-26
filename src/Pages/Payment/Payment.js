import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../Components/DashboardComponents/CheckoutForm';
import Spinner from '../../Components/Shared/Spinner/Spinner';

const stripePromise = loadStripe('pk_test_51L1setKFKOJzSEbCT5EI5QaiarH9AV9vbyZ3rQrCo1JuJCeUzim7KYua0rjOsSrgwuWk1dgjhKlMO0bl8gGQNuqr00sdEIH2Sa');

const Payment = () => {
   const { id } = useParams();
   const { data: order, isLoading, refetch } = useQuery('order', () => fetch(`https://manufacture-web.herokuapp.com/order/${id}`).then(res => res.json()));
   if (isLoading) { return <Spinner></Spinner> }

   return (
      <div className='section_default'>
         <Elements stripe={stripePromise}>
            <CheckoutForm order={order} refetch={refetch} />
         </Elements>
      </div>
   );
};

export default Payment;