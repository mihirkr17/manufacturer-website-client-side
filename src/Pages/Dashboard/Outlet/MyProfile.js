import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Shared/Spinner/Spinner';
import { auth } from '../../../firebase.init';
import ProfileEditModal from '../Modal/ProfileEditModal';

const MyProfile = () => {
   const [user] = useAuthState(auth);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

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
               <div className="col-md-6">
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
                  </div>
               </div>
               <div className="col-md-2 pt-4">
                  <Button variant="primary" onClick={handleShow}>
                     Edit Profile
                     <FontAwesomeIcon className='ms-2' icon={faPenSquare}></FontAwesomeIcon>
                  </Button>
               </div>
            </div>
            <div className="row">
               <div className="col-md-4">
                  <div className="profile-work">
                     <p>WORK LINK</p>
                     <Nav.Link as={Link} to="/">Home</Nav.Link>
                     <Nav.Link href={profile?.linkedin} rel="noreferrer" target='_blank'>Linkedin</Nav.Link>
                  </div>
               </div>
               <div className="col-md-8">
                  <div className="profile-tab">
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>User Id</label>
                        </div>
                        <div className="col-md-7">
                           <p>{profile?._id}</p>
                        </div>
                     </div>
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>Name</label>
                        </div>
                        <div className="col-md-7">
                           <p>{user?.displayName}</p>
                        </div>
                     </div>
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>Email</label>
                        </div>
                        <div className="col-md-7">
                           <p>{profile?.email}</p>
                        </div>
                     </div>
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>Phone</label>
                        </div>
                        <div className="col-md-7">
                           <p>{profile?.phone}</p>
                        </div>
                     </div>
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>Profession</label>
                        </div>
                        <div className="col-md-7">
                           <p>{profile?.profession}</p>
                        </div>
                     </div>
                     <div className="row py-1">
                        <div className="col-md-4">
                           <label>Address</label>
                        </div>
                        <div className="col-md-7">
                           <address>
                              <p>Village : {profile?.address?.village}</p>
                              <p>City : {profile?.address?.city}</p>
                              <p>Country : {profile?.address?.country}</p>
                              <p>Zip Code : {profile?.address?.zip}</p>
                           </address>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <ProfileEditModal
            show={show}
            handleClose={handleClose}
            user={user}
            refetch={refetch}
            profile={profile}
         ></ProfileEditModal>
      </div >
   );
};

export default MyProfile;