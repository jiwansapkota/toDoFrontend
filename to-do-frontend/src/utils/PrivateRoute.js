import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './AuthUtils';

const PrivateRoutes = () => {
    const authenticated = isAuthenticated();
    console.log('authenticated', authenticated);
    return (
        authenticated ? <Outlet /> : <Navigate replace to="/login" />
    )
}

export default PrivateRoutes;