import {  Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const AdminProtectedRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admintoken');
        if (!token) {
            navigate('/admin'); // Navigate to login if token doesn't exist
        }
    }, [navigate]); 

    return <Outlet />;
}

export default AdminProtectedRoute;

