import { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import { useLocation, useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'

function AdminBikeDetails() {

    const [bike, setBike] = useState({})
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bikeId = searchParams.get('bikeId');
    const navigate = useNavigate()

    console.log(bikeId, ">>>");
    console.log(bike, ">>>");


    useEffect(() => {
        if (bikeId) {
            axios.get(`/admin/bikedetails?bikeId=${bikeId}`)
                .then((response) => {
                    setBike(response.data.bike); // Update state with user data
                })
                .catch(() => {
                    toast.error('Error fetching bike data');
                });
        }
    }, [bikeId]);

    const verifyDocument = () =>{
        axios.get(`/admin/verify-bike?bikeId=${bike._id}`)
        .then(()=>{
            toast.success('Document verified')
            navigate('/admin-bikelist')
        })
        .catch(()=>{
            toast.error('Error in verify document');

        })
    }

    return (
        <div className='w-full flex font-googleFont'>
            <Adminsidebar />
            <div className='w-full h-screen bg-white flex flex-col items-center justify-center'>
                <h1 className='font-bold text-xl'>Bike Details</h1>
                <div className='w-96 h-72 bg-white rounded-xl border border-gray-500'>
                    <div className='w-96 h-72 border border-gray-500 rounded-xl  flex flex-col  items-center'>
                        {/* <div className='w-28 h-28 rounded-full mt-5 flex items-center justify-center border border-gray-600'>
                            <img src={`${BASE_URL}/admin-assets/uploads/user.png`} className='object-cover w-full h-full rounded-full' alt="userProfile" />
                        </div> */}
                        <div className='pt-3 pl-3'>
                        <p className='font-bold'>name : {bike.bike_name}</p>
                            <p>No : {bike.bike_number}</p>
                            <p>Location : {bike.location}</p>
                            <p>Rent : {bike.price}</p>
                            <p>Address : {bike.address}</p>
                            <p>Pincode : {bike.pinCode}</p>
                            <p>Details : {bike.details}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-72 flex justify-center'>
                    {bike && bike?.document?.length > 0 ? (
                         <div className='w-[800px] h-72 bg-white mx-2  flex justify-center items-center'>
                         <div className='w-[390px] h-64 rounded-xl border border-gray-400 relative'>
                     <img 
                       src={`${BASE_URL}/admin-assets/uploads/${bike?.document[0]}`} 
                       className="img-fluid absolute inset-0 w-full h-full object-cover rounded-xl" 
                       alt="Bike Image"
                     />
                   </div>
                         <div className='w-[390px] h-64 ml-2 rounded-xl border border-gray-400 relative'>
                     <img 
                       src={`${BASE_URL}/admin-assets/uploads/${bike?.document[1]}`} 
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

export default AdminBikeDetails
