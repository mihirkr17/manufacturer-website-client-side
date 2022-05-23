import React from 'react';

const UserSkeleton = ({ profile }) => {
   return (
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
               <label>Role</label>
            </div>
            <div className="col-md-7">
               <p>{profile?.role || 'User'}</p>
            </div>
         </div>
         <div className="row py-1">
            <div className="col-md-4">
               <label>Name</label>
            </div>
            <div className="col-md-7">
               <p>{profile?.username}</p>
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
   );
};

export default UserSkeleton;