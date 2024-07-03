import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify';


function AddOwner() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedMobile = mobile.trim();

    if (trimmedName === '' || trimmedEmail === '' || trimmedPassword === '' || trimmedMobile === '') {
      toast.error('Empty input fields');
    } else if (trimmedName.length < 3) {
      toast.error('Please enter a valid name (at least 3 characters)');
    } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(trimmedEmail)) {
      toast.error('Please enter a valid gmail address (e.g., example@gmail.com).');
    } else if (trimmedMobile.length < 10 || trimmedMobile.length >= 11) {
      toast.error('Please enter a valid mobile number');
    } else if (trimmedPassword.length < 6) {
      toast.error('Please enter at least 6 characters for the password');
    } else {
      axios.post(`/admin/addowner`, {  bikeowner_name: trimmedName, email: trimmedEmail, password: trimmedPassword, mobile: trimmedMobile })
        .then(() => {
          toast.success('New owner Added!!')
          navigate('/bike-owners');
        }).catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
        });
    }
  };

  return (
    <>
      <div className='min-h-screen bg-cover'>
        <div className='flex flex-col items-center'>
          <div className=' bg-gray-600 h-[400px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
            <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>ADD BIKE OWNER</h1>
            <form onSubmit={handleSubmit} className='mt-5 ml-10 '>
              <label htmlFor="name" className='font-googleFont text-lg'>Name</label>
              <input type="text"
                placeholder='Enter the name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              <label htmlFor="email" className='font-googleFont text-lg'>Email</label>
              <input type="email"
                name='email'
                placeholder='Enter the email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              <label htmlFor="mobile" className='font-googleFont text-lg'>Mobile</label>
              <input type="number"
                name='number'
                placeholder='Enter Mobile Number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              <label htmlFor="password" className='font-googleFont text-lg'>Password</label>
              <input type="password"
                name='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />

              <button type='submit' className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                ADD OWNER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddOwner;
