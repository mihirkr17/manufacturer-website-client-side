import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import Spinner from '../../Components/Shared/Spinner/Spinner';
import { Button, FloatingLabel, Form, FormLabel } from 'react-bootstrap';
import SocialLogin from '../../Components/Auth/SocialLogin';
import SpinnerBtn from '../../Components/Shared/SpinnerBtn';


const Login = () => {
   const { register, formState: { errors }, handleSubmit } = useForm();
   const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
   ] = useSignInWithEmailAndPassword(auth);

   const [token] = useToken(user);

   let loginErr;
   const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";

   useEffect(() => {
      if (token) {
         navigate(from, { replace: true });
      }
   }, [token, from, navigate])

   if (loading) {
      return <Spinner></Spinner>
   }

   if (error) {
      loginErr = <p className='text-danger fw-bold'><small>{error?.message}</small></p>
   }

   const onSubmit = data => {
      signInWithEmailAndPassword(data.email, data.password);
   }

   return (
      <div className='Login__section section_default'>
         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-sm-12 col-md-8 mx-auto">
                  <div className="card_default">
                  <h2 className="text-center fs-4 fw-bold py-5">Login To Carpen-Factory</h2>
                     <Form onSubmit={handleSubmit(onSubmit)} className='text-center'>
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
                        {loginErr}
                        <div className='text-center'>
                           <Button type='submit'>
                              {loading ? <><SpinnerBtn></SpinnerBtn> + 'loading...'</> : "Login"}
                           </Button>
                        </div>
                     </Form>
                     <p className='text-center py-4'>
                        <small>New to Carpen-Factory <Link className='text-primary' to="/register">Register</Link> Here</small>
                     </p>
                     <SocialLogin></SocialLogin>
                  </div>
               </div>
            </div>
         </div>
      </div >
   );
};

export default Login;