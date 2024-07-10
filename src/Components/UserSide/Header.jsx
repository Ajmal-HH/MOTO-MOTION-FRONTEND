import motologo from '../../assets/moto-motion-logo.png'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";


function Header() {

  const token = Cookies.get('jwt');
  console.log(token,"token...");
  const navigate = useNavigate()

  const handleLogout = () =>{
    axios.get('/user-logout')
    .then(()=>{
      toast.success('User Logout!')
      navigate('/')
    })
  }
  return (
    <div className=" fixed top-0 left-0 w-full bg-white h-16 flex  items-center rounded-b-full bg-opacity-85 z-50  ">
      <div className="w-16 h-8 ml-5 cursor-pointer">
        <img src={motologo} alt="logo" className='w-full h-full ' />
      </div>
      <h1 className="text-center text-2xl text-black ml-3 font-extrabold whitespace-nowrap cursor-pointer">MOTO MOTION</h1>
      <div className='font-googleFont flex text-xl ml-48 '>
        <Link to={'/'} className='ml-10 cursor-pointer '>HOME</Link>
        <Link to={'/bikes'} className='ml-10 cursor-pointer'>BIKES</Link>
        <Link to={'/bikeowner-login'} className='ml-10 cursor-pointer whitespace-nowrap '>BECOME A HOST</Link>
        <h3 className='ml-10 cursor-pointer'>ABOUT</h3>
        <h3 className='ml-10 cursor-pointer'>CONTACT</h3>
      </div>
      {
        token ? (
          <div className='flex'>
            <button onClick={handleLogout} className="border border-red-500 text-red-500 ml-16 px-4  rounded hover:bg-red-500 hover:text-white">
              LOGOUT
            </button>
            <div className='user w-10 h-10 ml-5 cursor-pointer'>
             <Link to={'/userprofile'}><FaUser size={32} /></Link> 
            </div>
          </div>
        ) :
          (
            <div className="ml-14 flex font-googleFont text-xl">
              <Link to={'/login'} className="cursor-pointer">Sign In</Link>
              <span className="mx-2">/</span>
              <Link to={'/signup'} className="cursor-pointer">Sign Up</Link>
            </div>
          )
      }

    </div>

  )
}

export default Header
