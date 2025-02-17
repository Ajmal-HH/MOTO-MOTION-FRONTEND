import {  Outlet, useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
import { useEffect } from 'react';

const UserProtectedRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token,"token check in protected route");
        if (!token) {
            navigate('/login'); // Navigate to login if token doesn't exist
        }
    }, [navigate]); 

    return <Outlet />;
}

export default UserProtectedRoute;
