  import { Link, useNavigate } from 'react-router-dom';
  import bgImage from '../../assets/forgot.jpg';
  import { useState } from 'react';
  import axios from '../../utils/axiosConfig'
  import { toast } from 'react-toastify';
import Header from '../../Components/UserSide/Header';


  function ResetPasswordForm() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
      e.preventDefault()
      axios.post('/forgot-password',{email})
      .then(()=>{
        toast.success(`otp sent to ${email}`)
        navigate('/otp',{state : {purpose : 'forgot-password'}})
      })
      .catch((err)=>{
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An error occurred. Please try again later.');
        }      
      })
    }
    return (
      <div>
        <Header />
      <div className="flex items-center justify-center w-full h-screen font-googleFont" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat' 
      }}>
        <div className='w-96 h-48 bg-gray-400  rounded-xl flex flex-col items-center pt-3'>
          <h1 className='font-bold text-2xl text-black '>Forgot password?</h1>
          <p>Remember your password?<Link to={'/login'} className='text-blue-800'>Login here</Link></p>
          <form onSubmit={handleSubmit} className='pl-3 mt-3'>
          <label>Email address</label>
          <input type="text"
          placeholder='Enter email address'
          onChange={(e)=>setEmail(e.target.value)}
          className='rounded-sm pl-2 w-[360px]  h-8'
          />
          <button type='submit' className='bg-yellow-500 rounded-sm w-[360px] h-8 mt-2'> Reset Password</button>
          </form>
        </div>
      </div>
      </div>
    );
  }

  export default ResetPasswordForm;
