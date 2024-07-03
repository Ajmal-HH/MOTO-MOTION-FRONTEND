import { useState } from "react";
import Header from "../../Components/UserSide/Header";
import bgImage from '../../assets/newpass.jpg';
import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import { passwordValidationSchema } from "../../FormValidation";
import { useNavigate } from 'react-router-dom';

function SetNewPassword() {
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await passwordValidationSchema.validate({ password, conformPassword }, { abortEarly: false });

            if (password === conformPassword) {
                await axios.post('/set-newpass', { password });
                toast.success('Password updated successfully.');
                navigate('/login')
            } else {
                toast.error('Passwords do not match. Please ensure both fields contain the same password.');
            }
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
        <div>
            <Header />
            <div className="w-full h-screen font-googleFont flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'contain', 
                    backgroundRepeat: 'no-repeat' 
                }}>
                <div className="w-[450px] min-h-64 bg-gray-400 rounded-xl flex flex-col bg-opacity-75">
                    <h1 className="text-center pt-3 text-2xl">Reset your password</h1>
                    <form onSubmit={handleSubmit} className="pl-6 pt-2">
                        <label>Password</label>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            className="w-[400px] h-9 pl-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <div className='text-red-600'>{errors.password}</div>}
                        <label>Confirm Password</label>
                        <input type="password"
                            name="conformPassword"
                            placeholder="Confirm Password"
                            className="w-[400px] h-9 pl-2"
                            value={conformPassword}
                            onChange={(e) => setConformPassword(e.target.value)} />
                        {errors.conformPassword && <div className='text-red-600'>{errors.conformPassword}</div>}
                        <button type="submit" className="w-[400px] h-9 bg-yellow-500 mt-5 rounded-md mb-5">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SetNewPassword;
