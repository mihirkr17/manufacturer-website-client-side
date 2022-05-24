import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import UserSkeleton from '../../../Components/DashboardComponents/UserSkeleton';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { auth } from '../../../firebase.init';
import ProfileEditModal from '../Modal/ProfileEditModal';

const MyProfile = () => {
   const [user] = useAuthState(auth);
   const [show, setShow] = useState(false);

   const { data: profile, isLoading, refetch } = useQuery('profile', () => fetch(`http://localhost:5000/user-info/${user?.email}`).then(res => res.json()));

   isLoading && <Spinner></Spinner>;

   return (
      <div className='my_profile'>
         <div className="container emp-profile">
            <div className="row">
               <div className="col-md-4">
                  <form className="profile-img pt-4">
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                     <div className="file btn btn-lg btn-primary">
                        Change Photo
                        <input type="file" name="file" />
                     </div>
                  </form>
               </div>
               <div className="col-md-8">
                  <div className="profile-head pt-4">
                     <h5>
                        {user?.displayName}
                     </h5>
                     <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                     <ul className="nav nav-tabs" id="myTab">
                        <li className="nav-item">
                           <span className="nav-link active">About</span>
                        </li>
                     </ul>
                     <div className="pb-2">
                        <button className='btn btn-primary btn-sm' onClick={() => setShow(true)}>
                           Edit Profile
                           <FontAwesomeIcon className='ms-2' icon={faPenSquare}></FontAwesomeIcon>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-4">
                  <div className="profile-work">
                     <p>WORK LINK</p>
                     <Nav.Link as={Link} to="/">Home</Nav.Link>
                     {profile?.linkedin && <Nav.Link href={profile?.linkedin} rel="noreferrer" target='_blank'>Linkedin</Nav.Link>}
                  </div>
               </div>
               <div className="col-md-8">

                  <UserSkeleton profile={profile}></UserSkeleton>
               </div>
            </div>
         </div>

         <ProfileEditModal
            show={show}
            handleClose={() => setShow(false)}
            user={user}
            refetch={refetch}
            profile={profile}
         ></ProfileEditModal>
      </div >
   );
};

export default MyProfile;