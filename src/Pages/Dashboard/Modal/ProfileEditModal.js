import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import AlertModal from '../../../Components/Shared/CustomModal/AlertModal';

const ProfileEditModal = ({ handleClose, show, user, refetch, profile }) => {
   const [msg, setMsg] = useState('');
   const [alertShow, setAlertShow] = useState(false);

   const handleForm = async (e) => {
      e.preventDefault();
      let village = e.target.village.value;
      let phone = e.target.phone.value;
      let city = e.target.city.value;
      let zip = e.target.zip.value;
      let country = e.target.country.value;
      let profession = e.target.profession.value;
      let linkedin = e.target.linkedin.value;
      let username = user?.displayName;

      let address = { village, city, country, zip }

      const response = await fetch(`https://manufacture-web.herokuapp.com/user/${user?.email}`, {
         method: "PUT",
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ username, address, phone, profession, linkedin })
      })

      if (response.ok) {
         const resData = await response.json();
         if (resData.result?.acknowledged === true) {
            refetch();
            handleClose();
            setAlertShow(true);
            setMsg("Data Inserted Successfully.");
         } else {
            setAlertShow(true);
            setMsg("Something went wrong!");
         }
      }
   }
   return (
      <>
         <AlertModal
            alertClose={() => setAlertShow(false)}
            alertShow={alertShow}
            message={msg}
         >
         </AlertModal>

         <Modal show={show}
         >
            <Modal.Header>
               <Modal.Title>Add Information :</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="container bootstrap snippet">
                  <div className="row">
                     <div className="col-sm-12">
                        <div className="tab-content">
                           <div className="tab-pane active" id="home">
                              <Form onSubmit={handleForm}>
                                 <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                       <Form.Label>Email</Form.Label>
                                       <Form.Control type="email" disabled defaultValue={profile?.email} placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                       <Form.Label>Phone</Form.Label>
                                       <Form.Control type="number" name='phone' defaultValue={profile?.phone || ''} placeholder="Phone Number" />
                                    </Form.Group>
                                 </Row>

                                 <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type='text' name='village' defaultValue={profile?.address?.village || ''} placeholder="Apartment, studio, or floor" />
                                 </Form.Group>

                                 <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                       <Form.Label>City</Form.Label>
                                       <Form.Control type='text' name='city' defaultValue={profile?.address?.city || ''} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                       <Form.Label>Country</Form.Label>
                                       <Form.Control type='text' defaultValue={profile?.address?.country || ''} name='country' />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                       <Form.Label>Zip</Form.Label>
                                       <Form.Control name='zip' defaultValue={profile?.address?.zip || ''} type='number' />
                                    </Form.Group>
                                 </Row>

                                 <Form.Group className="mb-3" id="formGridCheckbox">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control name='profession' defaultValue={profile?.profession || ''} type='text' />
                                 </Form.Group>

                                 <Form.Group className="mb-3" id="formGridCheckbox">
                                    <Form.Label>Linkedin profile Link</Form.Label>
                                    <Form.Control name='linkedin' defaultValue={profile?.linkedin || ''} type='text' />
                                 </Form.Group>


                                 <Modal.Footer>
                                    <Button variant="primary" type="submit">
                                       Submit
                                    </Button>
                                    <Button variant="danger" onClick={handleClose}>
                                       Close
                                    </Button>
                                 </Modal.Footer>
                              </Form>
                              <hr />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ProfileEditModal;