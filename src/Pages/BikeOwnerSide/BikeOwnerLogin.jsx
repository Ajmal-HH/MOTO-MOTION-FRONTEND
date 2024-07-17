import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../Components/UserSide/Header'
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { signInValidationSchema } from '../../FormValidation'


function BikeOwnerLogin() {
  const token = localStorage.getItem('ownerToken'); 

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (token) {
      navigate('/bikeowner-dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signInValidationSchema.validate({ email, password }, { abortEarly: false })

      axios.post(`/bikeowner/bikeowner-login`, { email, password })
        .then((response) => {
          const {ownerToken,bikeOwnerData} = response.data
          console.log(ownerToken,"token owner");
          console.log(bikeOwnerData,"bikeOwnerData");
          localStorage.setItem('ownerToken', ownerToken);
          localStorage.setItem('bikeOwnerData', bikeOwnerData);
          toast.success('Login successfully')
          navigate('/bikeowner-dashboard')
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
            //setErrors(err.response.data.message)
          } else {
            toast.error('An error occurred. Please try again later.');
          }
        })
    } catch (error) {  
      const newErrors = {}

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }

  }

  return (
    <div className='min-h-screen w-full flex flex-col'  style={{
      background: 'linear-gradient(90deg,rgba(2,0,36,1) 0%,rgba(74,14,154,1) 35%,rgba(0,212,225,1)100%)',
    }}>
      <Header />
      <div className='flex flex-grow justify-center items-center'>
        <div className='w-72 min-h-72 bg-white rounded-3xl'>
          <h1 className='text-center font-googleFont text-xl pt-3'>BIKE OWNER LOGIN</h1>
          <div className='pl-6 mt-5 font-googleFont'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <div>
                  <input
                    type="email"
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
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
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
                  />
                  {errors.password && <div className='text-red-600'>{errors.password}</div>}
                </div>
              </div>
              <button type='submit' className='bg-yellow-500 rounded-3xl w-20 mt-5 ml-20' >LOGIN</button>
            </form>
            <p className='text-center pr-6 mt-4'>
              {'Don\'t have an account?'}<Link to='/bikeowner-signup' className='text-blue-900'>Register</Link>
            </p>      </div>
        </div>
      </div>
    </div>
  )
}

export default BikeOwnerLogin
