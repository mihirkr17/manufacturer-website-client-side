import React, { useState } from 'react';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/DashboardComponents/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';



const Dashboard = () => {
   const [toggle, setToggle] = useState(true);
   const [user] = useAuthState(auth);
   return (
      <div className="dashboard section_default">
         <div className="container">
            <div className="dashboard_content" style={toggle === false ? { paddingLeft: '0px' } : { paddingLeft: '300px' }}>
               <div className="d-flex align-items-center justify-content-start border-bottom">
                  <button className={`btn me-3 btn-outline-primary`} onClick={() => setToggle(y => !y)}><FontAwesomeIcon icon={toggle === false ? faBars : faClose}></FontAwesomeIcon></button>
                  <h2 className='text-2xl font-bold text-purple-500'>Welcome {user?.displayName}</h2>
               </div>
               <div className="border-start">
                  <Outlet></Outlet>
               </div>
            </div>

            {
               toggle === true ? <Sidebar st={toggle}></Sidebar> : ''
            }

         </div>
      </div>
   );
};

export default Dashboard;