import  { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'
import {useNavigate } from 'react-router-dom'
import { signInValidationSchema } from '../../FormValidation';


function AdminLogin() {
  const token = localStorage.getItem('admintoken');
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (token) {
      navigate('/admin-dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      await signInValidationSchema.validate({email,password},{abortEarly : false})

      axios.post(`/admin/admin-login`,{email,password})
    .then((response)=>{
      const { admintoken } = response.data;
      // Store token in localStorage
      localStorage.setItem('admintoken', admintoken);
      toast.success('Login successfully')
      navigate('/admin-dashboard')
    })
    .catch((err)=>{
      console.log(err.response);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
        setErrors(err.response.data.message)
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    })
    } catch (error) {
      const newErrors = {}

      error.inner.forEach((err)=>{
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }

  }
  return (
    <div className=' min-h-screen w-full flex flex-col justify-center items-center'style={{
      background: 'linear-gradient(90deg,rgba(2,0,36,1) 0%,rgba(74,14,154,1) 35%,rgba(0,212,225,1)100%)',
    }}>
      <div className='w-72 min-h-80 bg-white rounded-3xl'>
        <h1 className='text-center font-googleFont text-xl pt-3'>ADMIN LOGIN</h1>
        <div className='pl-6 mt-5 font-googleFont'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <div>
                <input
                  type="text"
                  placeholder='Enter email'
                  className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
                  onChange={(e)=>setEmail(e.target.value)}
                />
                {errors.email && <div className='text-red-600'>{errors.email}</div>}
              </div>
            </div>
            <div className="mb-3">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder='Enter password'
                  className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
                  onChange={(e)=>setPassword(e.target.value)}
                />
               {errors.password && <div className='text-red-600'>{errors.password}</div>}

              </div>
            </div>
            <button type='submit' className='bg-yellow-500 rounded-3xl w-20 mt-5 ml-20' >LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
