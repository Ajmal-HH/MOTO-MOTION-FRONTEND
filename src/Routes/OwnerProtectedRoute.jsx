import {  Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const OwnerProtectedRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('ownerToken'); 
        if (!token) {
            navigate('/bikeowner-login'); // Navigate to login if token doesn't exist
        }
    }, [navigate]); 

    return <Outlet />;
}

export default OwnerProtectedRoute;

