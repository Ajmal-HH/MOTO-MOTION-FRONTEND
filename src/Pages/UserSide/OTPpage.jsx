import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify';


function OTPpage() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [showCounter, setShowCounter] = useState(true); // Initially set to true
  const [counter, setCounter] = useState(59); // Counter starts at 59 seconds
  const location = useLocation()
  const purpose = location.state?.purpose

  const sessionData = sessionStorage.getItem("usersDetails")
  const userData =  JSON.parse(sessionData);
  
  
  useEffect(() => {
    if (!showCounter) return; // Stop countdown if counter is hidden

    const countdownInterval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(countdownInterval);
          setShowCounter(false); // Hide the counter after timer reaches 0
        }
        return prevCounter > 0 ? prevCounter - 1 : prevCounter;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [showCounter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error('Enter valid OTP');
    } else {
      if(purpose === 'forgot-password'){
        axios.post('/verify-forgOTP',{otp,userData})
          .then(() => {
              navigate('/set-newpassword')   
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.error(err);
          });
      }else{
        axios.post(`/verifyOTP`, { otp })
        .then(()=>{
          toast.success('SignUp successful');
          sessionStorage.removeItem("usersDetails")
          navigate('/login');
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.error(err);
        });
      }
    }
  };

  const resendOTP = () => {
    axios.get(`/resentOTP`)
      .then(() => {
        toast.success('OTP re-sent');
        setShowCounter(true); // Show the counter again after resending OTP
        setCounter(59); // Reset timer
      })
      .catch((err) => {
        toast.error('Failed to resend OTP');
        console.error(err);
      });
  };

  return (
    <div className='w-full min-h-screen bg-green-300 flex flex-grow items-center justify-center font-googleFont'>
      <div className='w-96 h-48 bg-white rounded-xl flex flex-col items-center'>
        <h1 className='font-bold text-xl pt-3'>Verify your Email</h1>
        <p>OTP has been sent to your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type='number'
            placeholder='Enter OTP here'
            className='m-2 pl-2 border border-yellow-500'
            onChange={(e) => setOTP(e.target.value)}
          />
          <div className="flex justify-center">
            <button type='submit' className='bg-yellow-500 m-2 mt-5 rounded-xl w-24'>
              Verify OTP
            </button>
          </div>
        </form>
        {showCounter && (
          <p className='text-red-700' id="countdownText">Resend OTP: <span id="timer">{counter}</span> seconds</p>
        )}
        {!showCounter && (
          <p id="resendLink" onClick={resendOTP} className="cursor-pointer">Resend OTP</p>
        )}
      </div>
    </div>
  );
}

export default OTPpage;
