import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <GoogleOAuthProvider clientId="570712704353-ebdlf8ur6lip3n8uk19776btfvs2d9i6.apps.googleusercontent.com">
      <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
