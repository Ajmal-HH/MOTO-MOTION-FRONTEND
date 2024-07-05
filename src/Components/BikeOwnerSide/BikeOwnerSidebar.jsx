/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function BikeOwnerSidebar() {
  const navigate = useNavigate();
  const stateToPass = { purpose: 'bikeOwner' };

  const handleLogout = () => {
    axios.get('/bikeowner/owner-logout')
      .then(() => {
        toast.success('Bike Owner Logout!');
        navigate('/bikeowner-login');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <div className='w-60 min-h-screen font-bold bg-purple-500'>
      <div className='flex flex-col pt-24 pl-14'>
        <Link to='/bikeowner-dashboard' className='pt-5'>DASHBOARD</Link>
        {/* <Link to='/bikeowner-details' className='pt-5'>DETAILS</Link> */}
        <Link to='/bikeowner-bikedetails' className='pt-5'>BIKE DETAILS</Link>
        <Link to='/booking-list' className='pt-5'>BOOKINGS</Link>
        {/* <Link to={{ pathname: '/message', state: stateToPass }} className='pt-5'>CHATS</Link> */}
        <Link to={'/chat-owner'} className='pt-5'>CHATS</Link>
      </div>
      <div onClick={handleLogout} className='rounded-lg w-full h-10 flex justify-center items-center mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
        <h1>SIGN OUT</h1>
      </div>
    </div>
  );
}

export default BikeOwnerSidebar;
