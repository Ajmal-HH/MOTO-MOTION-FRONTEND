import { Link, useNavigate } from 'react-router-dom'
import axios from '../../utils/axiosConfig';
import {toast} from 'react-toastify'

function Adminsidebar() {
  const navigate = useNavigate()

  const handleLogout = () =>{
    axios.get('/admin/admin-logout')
    .then(()=>{
      localStorage.removeItem('admintoken');  
      toast.success('Admin Logout!')
      navigate('/admin')
    })
  }
  return (
    <div className='w-60  min-h-screen font-bold bg-purple-500'>
    <div className='flex flex-col pt-24 pl-14'>
    <Link to={'/admin-dashboard'} className='pt-5 '>DASHBOARD</Link>
    <Link to={'/user-list'} className='pt-5 '>USERS</Link>
    <Link to={'/bike-owners'} className='pt-5 '>BIKE OWNERS</Link>
    <Link to={'/admin-bookinglist'} className='pt-5 '>BOOKINGS</Link>
    <Link to={'/admin-bikelist'} className='pt-5 '>BIKES</Link>
</div>
<div onClick={handleLogout} className=' rounded-lg w-full h-10 flex justify-center items-center mt-2 border border-red-500 text-red-500  hover:bg-red-500 hover:text-white cursor-pointer'>
        <h1>SIGN OUT</h1>
      </div>
</div>
  )
}

export default Adminsidebar
