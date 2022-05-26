import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import SpinnerBtn from '../Shared/SpinnerBtn';
import './SocialLogin.css';


const SocialLogin = () => {
   const [signInWithGoogle, gUser, loading, error] = useSignInWithGoogle(auth);
   const [token] = useToken(gUser);
   const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";

   useEffect(() => {
      if (token) {
         navigate(from, { replace: true });
      }
   }, [navigate, token, from]);

   let errMsg;
   if (error) {
      errMsg = <p className='text-danger fw-bold'><small>Error: {error.message}</small></p>;
   };


   return (
      <div className="social_auth">
         <div className="divider">OR</div>
         {errMsg}
         <button
            onClick={() => signInWithGoogle()} className="btn btn-primary">
            {loading ? <><SpinnerBtn></SpinnerBtn> <span className='align-self-center'>Signing...</span></> : <span className='btn_text'>
               Login With Google</span>}
         </button>
      </div>
   );
};

export default SocialLogin;