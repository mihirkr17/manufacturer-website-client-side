import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';

const Sidebar = ({ st }) => {
   const [user] = useAuthState(auth);
   const [admin] = useAdmin(user);

   return (
      <aside className="dashboard_sidebar" style={st === false ? { width: '0px' } : { width: '300px' }}>
         <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            <li><Link to="/dashboard">My Profile</Link></li>

            {
               user && !admin ? <>
                  <li><Link to="/dashboard/review">Add Review</Link></li>
                  <li><Link to="/dashboard/my-order">My Order</Link></li>
               </>
                  : admin ?
                     <><li><Link to="/dashboard/manage-orders">Manage Orders</Link></li>
                        <li><Link to="/dashboard/add-product">Add Product</Link></li>
                        <li><Link to="/dashboard/manage-product">Manage Product</Link></li>
                     </> : ''
            }

         </ul>
      </aside>
   );
};

export default Sidebar;