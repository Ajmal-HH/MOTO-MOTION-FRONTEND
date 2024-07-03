import {  Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const AdminProtectedRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('jwt-admin');
        if (!token) {
            navigate('/admin'); // Navigate to login if token doesn't exist
        }
    }, [navigate]); 

    return <Outlet />;
}

export default AdminProtectedRoute;

