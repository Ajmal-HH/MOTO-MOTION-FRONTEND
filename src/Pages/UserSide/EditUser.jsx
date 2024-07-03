import {  useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../../assets/a.jpg';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import axios from '../../utils/axiosConfig'

function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({})


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const navigate = useNavigate();
  console.log(userId,"999");

  useEffect(()=>{
   axios.get(`/load-edituser?userId=${userId}`)
   .then((response)=>{
    const {name,email,mobile} = response.data
    setName(name)
    setEmail(email)
    setMobile(mobile)
   })
   .catch(()=>{
    toast.error('Error to fetching userData')
   })
  },[])

  const formData = new FormData()

  formData.append('name',name)
  formData.append('email',email)
  formData.append('mobile',mobile)

  const validationSchema =  Yup.object({
    name : Yup.string()
              .trim()
              .required('Name is required')
              .min(3,"Name must be atleast 3 characters"),
    email : Yup.string()
               .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/,'Please enter a valid gmail address (e.g., example@gmail.com).')
               .email('Invalid email formate')
               .required('Email is required'),
    mobile : Yup.string()
                .matches(/^\d{10}$/,"mobile number must be 10 digits")
                .required('Mobile number is required'),

  })
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await validationSchema.validate({name,email,mobile}, {abortEarly : false})

     axios.post(`/edituser`, { _id : userId ,name,mobile })
     .then(() => {
        toast.success('User data updated!')
        navigate('/userprofile');
     }).catch((err) => {
       if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
        setErrors(err.response.data.message)
      } else {
         toast.error('An error occurred. Please try again later.');
       }
     });
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(error); // Log the error for debugging purposes
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='flex flex-col items-center'>
          <div className=' bg-gray-600 min-h-[350px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
            <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>EDIT PROFILE</h1>
            <form onSubmit={handleSubmit} className='mt-5 ml-10 '>
              <label htmlFor="name" className='font-googleFont text-lg'>Name</label>
              <input type="text"
                placeholder='Enter the name'
                name='name'
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.name && <div className='text-red-600'>{errors.name}</div>}
              <label htmlFor="email" className='font-googleFont text-lg'>Email</label>
              <input type="email"
                name='email'
                placeholder='Enter the email'
                value={email}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.email && <div className='text-red-600'>{errors.email}</div>}
              <label htmlFor="mobile" className='font-googleFont text-lg'>Mobile</label>
              <input type="number"
                name='number'
                placeholder='Enter Mobile Number'
                defaultValue={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.mobile && <div className='text-red-600'>{errors.mobile}</div>}

              <button type='submit' className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                UPDATE
              </button>
            </form>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser;
