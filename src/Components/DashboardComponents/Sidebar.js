import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';

const Sidebar = ({ st }) => {
   const [user] = useAuthState(auth);
   const [admin] = useAdmin(user);

   const activeStyle = {
      color: "red"
   }

   return (
      <aside className="dashboard_sidebar" style={st === false ? { width: '0px' } : { width: '300px' }}>
         <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard">My Profile</NavLink></li>

            {
               user && !admin ? <>
                  <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/review">Add Review</NavLink></li>
                  <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/my-order">My Order</NavLink></li>
               </>
                  : admin ?
                     <>
                        <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/manage-users">Manage Users</NavLink></li>
                        <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/manage-orders">Manage Orders</NavLink></li>
                        <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/add-product">Add Product</NavLink></li>
                        <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/dashboard/manage-product">Manage Product</NavLink></li>
                     </> : ''
            }

         </ul>
      </aside>
   );
};

export default Sidebar;