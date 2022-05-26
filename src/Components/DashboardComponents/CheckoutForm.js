import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../Hooks/useMessage';

const CheckoutForm = ({ order, refetch }) => {
   const { msg, setMessage } = useMessage();
   const stripe = useStripe();
   const elements = useElements();
   const [clientSecret, setClientSecret] = useState('');
   const { total_price, email, username, product_name } = order;
   const navigate = useNavigate();
   const [paymentInfo, setPaymentInfo] = useState(null);

   useEffect(() => {
      let controller = new AbortController();
      (async () => {
         const response = await fetch(`https://manufacture-web.herokuapp.com/create-payment-intent`, {

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
         setMessage(`Payment Successful For ${product_name}`);
         // if the payment success then update the order details
         if (paymentIntent?.id) {
            let paymentId = { TxId: paymentIntent?.id };
            const res = await fetch(`https://manufacture-web.herokuapp.com/order-payment/${order._id}`, {
               method: "PUT",
               headers: {
                  'content-type': 'application/json'
               },
               body: JSON.stringify(paymentId)
            });
            const resData = await res.json();
            if (resData) {
               refetch();
            }
         }
         setPaymentInfo(paymentIntent);
         event.target.reset();
      }
   };

   return (
      <div className="card_default py-5 bg-light">
         <div className="py-1">
            <h5>Product Name : {order?.product_name}.</h5>
            <div className="d-flex flex-column">
               <small>Product Price: {order?.product_price}&nbsp;$</small>
               <small>Order Quantity: {order?.order_quantity}&nbsp; Pieces</small>
               <small>Total Price: {order?.total_price}&nbsp;$</small>
            </div>
         </div>
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
            <div className="text-center py-3 d-flex flex-column">
               <button className='btn btn-sm btn-primary mb-5' type="submit" disabled={!stripe || !clientSecret}>
                  Pay Now
               </button>
               {msg}
            </div>
         </form>

         <div className="py-3">
            {
               paymentInfo?.id ? <strong className='text-success'>Your TxId: {paymentInfo?.id}</strong> : ''
            }
         </div>
      </div>

   );
};

export default CheckoutForm;