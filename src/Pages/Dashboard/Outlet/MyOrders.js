import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import OrderTable from '../../../Components/MyOrderComponents/OrderTable';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { auth } from '../../../firebase.init';
import { useMessage } from '../../../Hooks/useMessage';

const MyOrders = () => {
   const [user] = useAuthState(auth);
   const { msg, setMessage } = useMessage();
   const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/my-orders/${user?.email}`).then(res => res.json()));

   isLoading && <Spinner></Spinner>;

   return (
      <div className='section_default'>
         <div className="container">
            {msg}
            <OrderTable orders={orders} refetch={refetch} setMessage={setMessage}></OrderTable>
         </div>
      </div>
   );
};

export default MyOrders;