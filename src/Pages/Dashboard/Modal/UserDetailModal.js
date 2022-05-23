import React from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import UserSkeleton from '../../../Components/DashboardComponents/UserSkeleton';

const UserDetailModal = ({ profile, handleClose }) => {
   return (
      <Modal show={profile} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="row">
               <div className="col-md-4">
                  <div className="profile-work">
                     <p>WORK LINK</p>
                     {profile?.linkedin && <Nav.Link href={profile?.linkedin} rel="noreferrer" target='_blank'>Linkedin</Nav.Link>}
                  </div>
               </div>
               <div className="col-md-8">
                  <UserSkeleton profile={profile}></UserSkeleton>
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default UserDetailModal;