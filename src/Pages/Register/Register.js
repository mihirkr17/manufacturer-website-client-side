import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import { Button, FloatingLabel, Form, FormLabel } from 'react-bootstrap';
import SocialLogin from '../../Components/Auth/SocialLogin';
import SpinnerBtn from '../../Components/Shared/SpinnerBtn';

const Register = () => {
   const { register, formState: { errors }, handleSubmit } = useForm();

   // Create user with email and password
   const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
   ] = useCreateUserWithEmailAndPassword(auth);

   // updating profile display name 
   const [updateProfile, updating, upError] = useUpdateProfile(auth);

   const [token] = useToken(user);

   let registerErr;
   const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";

   useEffect(() => {
      if (token) {
         navigate(from, { replace: true });
      }
   }, [token, from, navigate])

   if (loading || updating) {
      return <Spinner></Spinner>
   }

   if (error || upError) {
      registerErr = <p className='text-danger fw-bold'><small>{error?.message || upError?.message}</small></p>
   }

   const onSubmit = async(data) => {
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({displayName: data.username});
   }

   return (
      <div className='Login__section section_default auth'>
         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-sm-12 col-md-8 mx-auto">
                  <div className="card_default">
                     <h2 className="text-center fs-4 fw-bold py-5">Register To Carpent-Factory</h2>
                     <Form onSubmit={handleSubmit(onSubmit)} className='text-center'>
                        <FloatingLabel
                           controlId="floatingInput"
                           label="username"
                           className="w-75 mx-auto"
                        >
                           <Form.Control type="text"
                              {...register("username", {
                                 required: {
                                    value: true,
                                    message: "Username Required!"
                                 }, maxLength: {
                                    value: 20,
                                    message: "Username Less Than 20 Characters"
                                 }
                              })}
                              placeholder="name@example" />
                        </FloatingLabel>
                        <FormLabel>
                           {errors.username?.type === 'required' && <small className="text-danger fw-bold">{errors.username.message}</small>}
                           {errors.username?.type === 'maxLength' && <small className="text-danger fw-bold">{errors.username.message}</small>}
                        </FormLabel>

                        <FloatingLabel
                           controlId="floatingInput"
                           label="Email address"
                           className="w-75 mx-auto"
                        >
                           <Form.Control type="email"
                              {...register("email", {
                                 required: {
                                    value: true,
                                    message: 'Email is Required!'
                                 },
                                 pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                 }
                              })}
                              placeholder="name@example.com" />
                        </FloatingLabel>
                        <FormLabel>
                           {errors.email?.type === 'required' && <small className="text-danger fw-bold">{errors.email.message}</small>}
                           {errors.email?.type === 'pattern' && <small className="text-danger fw-bold">{errors.email.message}</small>}
                        </FormLabel>
                        <FloatingLabel
                           controlId="floatingPassword"
                           label="Password"
                           className="mb-3 w-75 mx-auto"
                        >
                           <Form.Control type="password"
                              {...register("password", {
                                 required: {
                                    value: true,
                                    message: 'Password is Required'
                                 },
                                 minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                 }
                              })}
                              placeholder="Password" />
                        </FloatingLabel>
                        <FormLabel>
                           {errors.password?.type === 'required' && <small className="text-danger fw-bold">{errors.password.message}</small>}
                           {errors.password?.type === 'minLength' && <small className="text-danger fw-bold">{errors.password.message}</small>}
                        </FormLabel>
                        {registerErr}
                        <div className='text-center'>
                           <Button type='submit'>
                              {loading || updating ? <><SpinnerBtn></SpinnerBtn> loading...</> : "Register Now"}
                           </Button>
                        </div>
                     </Form>
                     <p className='text-center py-4'>
                        <small>Already Logged In ? <Link className='text-primary' to="/login">Login</Link> Here</small>
                     </p>
                     <SocialLogin></SocialLogin>
                  </div>
               </div>
            </div>
         </div>
      </div >
   );
};

export default Register;