import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import Spinner from '../Shared/Spinner/Spinner';
import useAdmin from '../../Hooks/useAdmin';
const RequiredAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const location = useLocation();

    if (loading || adminLoading) {
        return <Spinner></Spinner>
    }

    if (!user || !admin) {
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequiredAdmin;