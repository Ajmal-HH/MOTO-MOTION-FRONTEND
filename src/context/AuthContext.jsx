import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from "react";
import axios from '../utils/axiosConfig'

import Cookies from 'js-cookie'



export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwt')
    if (token) {
        axios.get('/userprofile')
        .then((response)=>{
            setAuthUser(response.data);
        })
    }
  }, []);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

