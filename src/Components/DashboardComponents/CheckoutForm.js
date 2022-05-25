import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../Hooks/useMessage';

const CheckoutForm = ({ order, setPaymentInfo }) => {
   const { msg, setMessage } = useMessage();
   const stripe = useStripe();
   const elements = useElements();
   const [clientSecret, setClientSecret] = useState('');
   const { total_price, email, username } = order;
   const navigate = useNavigate();

   useEffect(() => {
      let controller = new AbortController();
      (async () => {
         const response = await fetch(`http://localhost:5000/create-payment-intent`, {

            method: "POST",
            headers: {
               'content-type': 'application/json',
               authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ total_price }),
            signal: controller.signal
         });

         const data = await response.json();

         if (data?.clientSecret) {
            setClientSecret(data?.clientSecret);
         }
      })();

      return () => {
         controller?.abort();
      }
   }, [total_price]);

   const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);

      if (card === null) {
         return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      });

      if (error) {
         console.log('[error]', error);
      } else {
         console.log('[PaymentMethod]', paymentMethod);
      }

      const { paymentIntent, error: intErr } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  name: username,
                  email: email
               },
            },
         },
      );

      if (intErr) {
         setMessage(intErr?.message);
      } else {
         // if the payment success then update the order details
         if (paymentIntent?.id) {
            let paymentId = { TxId: paymentIntent?.id };
            const res = await fetch(`http://localhost:5000/order-payment/${order._id}`, {
               method: "PUT",
               headers: {
                  'content-type': 'application/json'
               },
               body: JSON.stringify(paymentId)
            });
            const resData = await res.json();
            setPaymentInfo(paymentIntent && resData);
            event.target.reset();
         }
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: '16px',
                     color: '#424770',
                     '::placeholder': {
                        color: '#aab7c4',
                     },
                  },
                  invalid: {
                     color: '#9e2146',
                  },
               },
            }}
         />
         <button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret}>
            Pay
         </button>
         {msg}
      </form>
   );
};

export default CheckoutForm;