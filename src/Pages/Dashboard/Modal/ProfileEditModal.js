import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import AlertModal from '../../../Components/Shared/CustomModal/AlertModal';
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";

const ProfileEditModal = ({ handleClose, show, user, refetch, profile }) => {
   const { register, formState: { errors }, handleSubmit, reset } = useForm();
   const [msg, setMsg] = useState('');
   const [alertShow, setAlertShow] = useState(false);

   // open and close handler for alert modal
   const alertOpen = () => setAlertShow(true);
   const alertClose = () => setAlertShow(false);

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
            alertOpen();
            setMsg("Data Inserted Successfully.");
         } else {
            alertOpen();
            setMsg("Something went wrong!");
         }
      }
   }
   const imageApiKey = '3e2f79893e30db2cde3328e30d46fca0';
   const handleImage = async (data) => {
      // e.preventDefault();
      let image = data.image[0];
      let formData = new FormData();
      formData.append('image', image);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, {
         method: "POST",
         body: formData
      });

      if (response.ok) {
         const res = await response.json();
         console.log(res);
      }
   }
   return (
      <>
         <AlertModal
            alertClose={alertClose}
            alertShow={alertShow}
            message={msg}
         >
         </AlertModal>

         <Modal show={show}
            dialogClassName="modal-90w"
            onHide={handleClose}
         >
            <Modal.Header closeButton>
               <Modal.Title>Add Information :</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="container bootstrap snippet">
                  <div className="row">
                     <div className="col-12">
                        <form className="profile-img pt-4" onSubmit={handleSubmit(handleImage)}>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                           <div className="file btn btn-lg btn-primary">
                              Change Photo
                              <input type="file" name="file" />
                              {/* <FileBase64
                                 type="file"
                                 multiple={false}
                                 onDone={changeHandler}
                              /> */}
                           </div>

                           <div className="form-control w-full max-w-xs">
                              <label className="label">
                                 <span className="label-text">Photo</span>
                              </label>
                              <input
                                 type="file"
                                 className="input input-bordered w-full max-w-xs"
                                 {...register("image", {
                                    required: {
                                       value: true,
                                       message: 'Image is Required'
                                    }
                                 })}
                              />
                              <label className="label">
                                 {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                              </label>
                           </div>
                           <button className='btn btn-sm btn-primary' type='submit'>Change Image</button>
                        </form>
                     </div>
                     <div className="col-sm-12">
                        <div className="tab-content">
                           <div className="tab-pane active" id="home">
                              <Form onSubmit={handleForm}>
                                 <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                       <Form.Label>Email</Form.Label>
                                       <Form.Control type="email" disabled value={profile?.email} placeholder="Enter email" />
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

                                 <Button variant="primary" type="submit">
                                    Submit
                                 </Button>
                              </Form>
                              <hr />
                           </div>

                        </div>
                     </div>

                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ProfileEditModal;