

import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AdminDashboard from './Pages/AdminSide/AdminDashboard';
import AdminLogin from './Pages/AdminSide/AdminLogin';
import UserList from './Pages/AdminSide/UserList';
import AddBike from './Pages/BikeOwnerSide/AddBike';
import BikeOwnerDashboard from './Pages/BikeOwnerSide/BikeOwnerDashboard';
import BikeOwnerLogin from './Pages/BikeOwnerSide/BikeOwnerLogin';
import BikeOwnerSignup from './Pages/BikeOwnerSide/BikeOwnerSignup';
import BikeOwners from './Pages/AdminSide/BikeOwners';
import Bikes from './Pages/UserSide/Bikes';
import Homepage from './Pages/UserSide/Homepage';
import Login from './Pages/UserSide/Login';
import OTPpage from './Pages/UserSide/OTPpage';
import Register from './Pages/UserSide/Register';
import BikeDetails from './Pages/UserSide/BikeDetails';
import AddUser from './Pages/AdminSide/AddUser';
import AdminEdituser from './Pages/AdminSide/AdminEdituser';
import AddOwner from './Pages/AdminSide/AddOwner';
import AdminEditOwner from './Pages/AdminSide/AdminEditOwner';
import BikeDetailsOwnerside from './Pages/BikeOwnerSide/BikeDetailsOwnerside';
import EditbikeOwner from './Pages/BikeOwnerSide/EditbikeOwner';
import UserProfile from './Pages/UserSide/UserProfile';
import EditUser from './Pages/UserSide/EditUser';
import UserDetails from './Pages/AdminSide/UserDetails';
import UserProtectedRoute from './Routes/UserProtectedRoute';
import OwnerProtectedRoute from './Routes/OwnerProtectedRoute';
import AdminProtectedRoute from './Routes/AdminProtectedRoute';
import ResetPasswordForm from './Pages/UserSide/ResetPasswordForm';
import SetNewPassword from './Pages/UserSide/SetNewPassword';
import CheckOut from './Pages/UserSide/CheckOut';
import BookingSuccess from './Pages/UserSide/BookingSuccess';
import BookingList from './Pages/BikeOwnerSide/BookingList';
import UserBookingList from './Pages/UserSide/UserBookingList';
import AdminBookingList from './Pages/AdminSide/AdminBookingList';
import VerifyUserDocument from './Pages/AdminSide/VerifyUserDocument';
import AdminBikeList from './Pages/AdminSide/AdminBikeList';
import Wallet from './Pages/UserSide/Wallet';
import Loader from './Components/UserSide/Loader';
import { useAuthContext } from './context/AuthContext';
import Chat from './Pages/Messages/Chat';
import ChatOwnerSide from './Pages/BikeOwnerSide/ChatOwnerSide';

function App() {
  const {authUser} = useAuthContext()
  return (
    <>
      <ToastContainer />
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/otp' element={<OTPpage />} />
              <Route path='/bikes' element={<Bikes />} />
              <Route path='/bike-details' element={<BikeDetails />} />
              <Route path='/reset-password' element={<ResetPasswordForm />} />
              <Route path='/set-newpassword' element={<SetNewPassword />} />
              <Route element={<UserProtectedRoute />}>
                <Route path='/userprofile' element={<UserProfile />} />
                <Route path='/edit-user' element={<EditUser />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/booking-success' element={<BookingSuccess />} />
                <Route path='/user-bookinglist' element={<UserBookingList />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/chat'element={authUser ? <Chat /> : <Navigate to={"/login"} />} />
              </Route>

              <Route path='/bikeowner-signup' element={<BikeOwnerSignup />} />
              <Route path='/bikeowner-login' element={<BikeOwnerLogin />} />
              <Route element={<OwnerProtectedRoute />}>
                <Route path='/bikeowner-dashboard' element={<BikeOwnerDashboard />} />
                <Route path='/addbike' element={<AddBike />} />
                <Route path='/bikeowner-bikedetails' element={<BikeDetailsOwnerside />} />
                <Route path='/bikeowner-editbike' element={<EditbikeOwner />} />
                <Route path='/booking-list' element={<BookingList />} />
                <Route path={'/chat-owner'} element={<ChatOwnerSide />} />
              </Route>

              <Route path='/admin' element={<AdminLogin />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/user-list' element={<UserList />} />
                <Route path='/user-details' element={<UserDetails />} />
                <Route path='/bike-owners' element={<BikeOwners />} />
                <Route path='/adduser' element={<AddUser />} />
                <Route path='/verify-userdocument' element={<VerifyUserDocument />} />
                <Route path='/admin-loadedituser' element={<AdminEdituser />} />
                <Route path='/addowner' element={<AddOwner />} />
                <Route path='/admin-loadeditowner' element={<AdminEditOwner />} />
                <Route path='/admin-bookinglist' element={<AdminBookingList />} />
                <Route path='/admin-bikelist' element={<AdminBikeList />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
    </>
  );
}

export default App;



// import AdminDashboard from './Pages/AdminSide/AdminDashboard'
// import AdminLogin from './Pages/AdminSide/AdminLogin'
// import UserList from './Pages/AdminSide/UserList'
// import AddBike from './Pages/BikeOwnerSide/AddBike'
// import BikeOwnerDashboard from './Pages/BikeOwnerSide/BikeOwnerDashboard'
// import BikeOwnerDetails from './Pages/BikeOwnerSide/BikeOwnerDetails'
// import BikeOwnerLogin from './Pages/BikeOwnerSide/BikeOwnerLogin'
// import BikeOwnerSignup from './Pages/BikeOwnerSide/BikeOwnerSignup'
// import BikeOwners from './Pages/AdminSide/BikeOwners'
// import Bikes from './Pages/UserSide/Bikes'
// import Homepage from './Pages/UserSide/Homepage'
// import Login from './Pages/UserSide/Login'
// import OTPpage from './Pages/UserSide/OTPpage'
// import Register from './Pages/UserSide/Register'
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// //import { Toaster } from 'sonner'
// import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import BikeDetails from './Pages/UserSide/BikeDetails'
// import AddUser from './Pages/AdminSide/AddUser'
// import AdminEdituser from './Pages/AdminSide/AdminEdituser'
// import AddOwner from './Pages/AdminSide/AddOwner'
// import AdminEditOwner from './Pages/AdminSide/AdminEditOwner'
// import BikeDetailsOwnerside from './Pages/BikeOwnerSide/BikeDetailsOwnerside'
// import EditbikeOwner from './Pages/BikeOwnerSide/EditbikeOwner'
// import UserProfile from './Pages/UserSide/UserProfile'
// import EditUser from './Pages/UserSide/EditUser'
// import UserDetails from './Pages/AdminSide/UserDetails'
// import UserProtectedRoute from './Routes/UserProtectedRoute'
// import OwnerProtectedRoute from './Routes/OwnerProtectedRoute'
// import AdminProtectedRoute from './Routes/AdminProtectedRoute'
// import ResetPasswordForm from './Pages/UserSide/ResetPasswordForm'
// import SetNewPassword from './Pages/UserSide/SetNewPassword'
// import CheckOut from './Pages/UserSide/CheckOut'
// import BookingSuccess from './Pages/UserSide/BookingSuccess'
// import BookingList from './Pages/BikeOwnerSide/BookingList'
// import UserBookingList from './Pages/UserSide/UserBookingList'
// import AdminBookingList from './Pages/AdminSide/AdminBookingList'
// import VerifyUserDocument from './Pages/AdminSide/VerifyUserDocument'
// import AdminBikeList from './Pages/AdminSide/AdminBikeList'
// import Wallet from './Pages/UserSide/Wallet'
// import Loader from './Components/UserSide/Loader'
// import { Suspense } from 'react'
// import MessageHome from './Pages/Messages/MessageHome'

// //for modal
// // index.js or App.js
// import 'primereact/resources/themes/saga-blue/theme.css';  // theme
// import 'primereact/resources/primereact.min.css';         // core css
// import 'primeicons/primeicons.css';                       // icons
// import { AuthContextProvider } from './context/AuthContext'


// function App() {
//   return (
//     <>
//     {/* <Toaster/> */}
//     <ToastContainer />
//     <AuthContextProvider>
//     <Router>
//         <Suspense fallback={<Loader />}>
//       <Routes>
//         <Route path='/' element={<Homepage />} />
//         <Route path='/signup' element={<Register />}></Route>
//         <Route path='/login' element={<Login />}></Route>
//         <Route path='/otp' element={<OTPpage />} />
//         <Route path='/bikes' element={<Bikes />} ></Route>
//         <Route path='/bike-details' element={<BikeDetails />} />
//         <Route path='/reset-password' element={<ResetPasswordForm />} />
//         <Route path='/set-newpassword' element={<SetNewPassword />} />
//         <Route element={<UserProtectedRoute />}>
//         <Route path='/userprofile' element={<UserProfile />} />
//         <Route path='/edit-user' element={<EditUser />} />
//         <Route path='/checkout' element={<CheckOut />} />
//         <Route path='/booking-success' element={<BookingSuccess />} />
//         <Route path='/user-bookinglist' element={<UserBookingList />} />
//         <Route path='/wallet' element={<Wallet />} />
//         <Route path='/message' element={<MessageHome />} />
//         </Route>




//         <Route path='/bikeowner-signup' element={<BikeOwnerSignup />} />
//         <Route path='/bikeowner-login' element={<BikeOwnerLogin />} />
//         <Route element={<OwnerProtectedRoute />}>
//         <Route path='/bikeowner-dashboard' element={<BikeOwnerDashboard />} />
//         <Route path='/addbike' element={<AddBike />} />
//         <Route path='/bikeowner-details' element={<BikeOwnerDetails />} />
//         <Route path='/bikeowner-bikedetails' element={<BikeDetailsOwnerside />}/>
//         <Route path='/bikeowner-editbike' element={<EditbikeOwner />} />
//         <Route path='/booking-list' element={<BookingList />} />
//         </Route>


//        <Route path='/admin' element={<AdminLogin />} />
//        <Route element={<AdminProtectedRoute />} >
//        <Route path='/admin-dashboard' element={<AdminDashboard />} />
//        <Route path='/user-list' element={<UserList /> } />
//        <Route path='/user-details' element={<UserDetails />} />
//        <Route path='/bike-owners' element={<BikeOwners />} />
//        <Route path='/adduser' element={<AddUser />} />
//        <Route path='/verify-userdocument' element={<VerifyUserDocument />} />
//        <Route path='/admin-loadedituser' element={<AdminEdituser />} />
//        <Route path='/addowner' element={<AddOwner />} />
//        <Route path='/admin-loadeditowner' element={<AdminEditOwner />} />
//        <Route path='/admin-bookinglist' element={<AdminBookingList />} />
//        <Route path='/admin-bikelist' element={<AdminBikeList />} />
//        </Route>
       
//       </Routes>
//       </Suspense>
//     </Router>   
//     </AuthContextProvider>
//     </>
//   )
// }

// export default App

