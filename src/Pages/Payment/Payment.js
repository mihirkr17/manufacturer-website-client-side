import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../Components/DashboardComponents/CheckoutForm';
import Spinner from '../../Components/Shared/Spinner/Spinner';

const stripePromise = loadStripe('pk_test_51L1setKFKOJzSEbCT5EI5QaiarH9AV9vbyZ3rQrCo1JuJCeUzim7KYua0rjOsSrgwuWk1dgjhKlMO0bl8gGQNuqr00sdEIH2Sa');

const Payment = () => {
   const [paymentInfo, setPaymentInfo] = useState(null);
   const { id } = useParams();
   const { data: order, isLoading, refetch } = useQuery('order', () => fetch(`http://localhost:5000/order/${id}`).then(res => res.json()));
   if (isLoading) { return <Spinner></Spinner> }

   console.log(paymentInfo);

   return (
      <div>
         {id}
         <Elements stripe={stripePromise}>
            <CheckoutForm order={order} setPaymentInfo={setPaymentInfo}/>
         </Elements>



         <div className="card">
            <div className="card-body">
               Your TxId: {paymentInfo?.id}
            </div>
         </div>
      </div>
   );
};

export default Payment;