import { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import { useLocation, useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'

function UserDetails() {

    const [user, setUser] = useState({})
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const navigate = useNavigate()

    console.log(userId, ">>>");
    console.log(user, ">>>");


    useEffect(() => {
        if (userId) {
            axios.get(`/admin/userdetails?userId=${userId}`)
                .then((response) => {
                    setUser(response.data.user); // Update state with user data
                })
                .catch(() => {
                    toast.error('Error fetching user data');
                });
        }
    }, [userId]);

    const verifyDocument = () =>{
        axios.get(`/admin/verify-document?userId=${user._id}`)
        .then(()=>{
            toast.success('Document verified')
            navigate('/user-list')
        })
        .catch(()=>{
            toast.error('Error in verify document');

        })
    }

    return (
        <div className='w-full flex font-googleFont'>
            <Adminsidebar />
            <div className='w-full h-screen bg-white flex flex-col items-center justify-center'>
                <h1 className='font-bold text-xl'>User Details</h1>
                <div className='w-96 h-72 bg-white rounded-xl border border-gray-500'>
                    <div className='w-96 h-72 border border-gray-500 rounded-xl  flex flex-col  items-center'>
                        <div className='w-28 h-28 rounded-full mt-5 flex items-center justify-center border border-gray-600'>
                            <img src={`${BASE_URL}/admin-assets/uploads/user.png`} className='object-cover w-full h-full rounded-full' alt="userProfile" />
                        </div>
                        <p className='font-bold'>name : {user.name}</p>
                        <div className='pt-3'>
                            <p>email : {user.email}</p>
                            <p>mobile : {user.mobile}</p>
                            <p>date : {user.date}</p>
                            <p>account_status : {user.account_status}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-72 flex justify-center'>
                    {user && user?.document?.length > 0 ? (
                         <div className='w-[800px] h-72 bg-white mx-2  flex justify-center items-center'>
                         <div className='w-[390px] h-64 rounded-xl border border-gray-400 relative'>
                     <img 
                       src={`${BASE_URL}/admin-assets/uploads/${user?.document[0]}`} 
                       className="img-fluid absolute inset-0 w-full h-full object-cover rounded-xl" 
                       alt="Bike Image"
                     />
                   </div>
                         <div className='w-[390px] h-64 ml-2 rounded-xl border border-gray-400 relative'>
                     <img 
                       src={`${BASE_URL}/admin-assets/uploads/${user?.document[1]}`} 
                       className="img-fluid absolute inset-0 w-full h-full object-cover rounded-xl" 
                       alt="Bike Image"
                     />
                   </div>
                         </div>
                    ) : (
                        <h1>Document not uploaded</h1>
                    )}
                </div>
                <div>
                        <button onClick={verifyDocument} className='bg-yellow-500 rounded-xl w-36 h-7'>Verify Document</button>
                    </div>
            </div>
        </div>
    )
}

export default UserDetails
