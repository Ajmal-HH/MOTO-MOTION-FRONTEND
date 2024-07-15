import { useEffect, useState } from 'react'
import Header from '../../Components/UserSide/Header'
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/UserSide/Footer';



function UserProfile() {
    const [user, setUser] = useState({})
    const [document, setDocument] = useState([])
    const [documentUpload, setDocumentUpload] = useState()
    const navigate = useNavigate()
    const [frontDoc, setFrontDoc] = useState()
    const [backDoc, setBackDoc] = useState()


    useEffect(() => {
        axios.get('/userprofile')
            .then((response) => {
                console.log(response.data);
                setUser(response.data)
            })
            .catch((err) => {
                const message = err.response?.data?.message;
                if (message) {
                    if (message === 'User is Blocked') {
                        navigate('/');
                        toast.error(message);
                    }
                }else{
                navigate('/')
                console.log('Error to fetch user data');
                }
            })
    }, [documentUpload, navigate])

    const handleDocument = (e) => {
        e.preventDefault()
        const formData = new FormData();
        document.forEach(file => {
            formData.append('document', file);
        });

        axios.post(`/add-document?userId=${user._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response);
                setDocumentUpload(true)
                toast.success('Documents uploaded successfully');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            });
    }



    const frontSideDoc = (e) => {
        const selectedFiles = e.target.files;
        setDocument([...document, ...selectedFiles]);
        const file = selectedFiles[0];
        const tempURL = URL.createObjectURL(file);
        setFrontDoc(tempURL);
    }

    const backSideDoc = (e) => {
        const selectedFiles = e.target.files;
        setDocument([...document, ...selectedFiles]);
        const file = selectedFiles[0];
        const tempURL = URL.createObjectURL(file);
        setBackDoc(tempURL);
    }

    const handleLogout = () => {
        axios.get('/user-logout')
            .then(() => {
                toast.success('User Logout!')
                navigate('/')
            })
    }

    return (
        <div >
            <Header />
            <div className='w-full min-h-[650px] bg-white flex mt-20 font-googleFont'>
                <div className='w-96 h-[600px] ml-10'>
                    <div className='w-72 h-80 border border-gray-500 rounded-xl  flex flex-col  items-center'>
                        <div className='w-28 h-28 rounded-full mt-5 flex items-center justify-center border border-gray-600'>
                            <img src={`${BASE_URL}/admin-assets/uploads/user.png`} className='object-cover w-full h-full rounded-full' alt="userProfile" />
                        </div>
                        <p className='font-bold'>{user?.name}</p>
                        <p>account status :</p>
                        {user && user?.account_status === 'verified' ? (
                            <p><span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </span>{user?.account_status}</p>
                        ) : (
                            <p>{user?.account_status}</p>
                        )}
                        <p>{user?.email}</p>
                        <p>{user?.mobile}</p>
                        <Link to={`/edit-user?userId=${user?._id}`} className='w-24 h-6 bg-yellow-500 rounded-lg mt-3 text-center'>Edit profile</Link>
                    </div>
                    <div className='w-72 h-48 mt-2 rounded-xl  flex flex-col  items-center'>
                        <Link to={'/wallet'} className=' rounded-lg w-full h-10 flex justify-center items-center mt-2 border border-gray-500'>
                            <h1>WALLET</h1>
                        </Link>
                        <Link to={'/user-bookinglist'} className=' rounded-lg w-full h-10 flex justify-center items-center mt-2 border border-gray-500'>
                            <h1>BOOKING HISTORY</h1>
                        </Link>
                        <div onClick={handleLogout} className=' rounded-lg w-full h-10 flex justify-center items-center mt-2 border border-red-500 text-red-500  hover:bg-red-500 hover:text-white cursor-pointer'>
                            <h1>SIGN OUT</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[600px]'>
                    <div className='w-[950px] min-h-[400px] ml-10 rounded-xl border border-gray-500 bg-whit pl-7 pt-5'>
                        <h1 className='font-bold text-xl'>Document Verification</h1>
                        <ul className="list-disc pl-8 ">
                            <li>Please upload the following documents :</li>
                            <p>1. Driving License / Internation Driving Permit</p>
                            <li>Ensure to upload pictures of original documents only</li>
                            <li>Learning License is not applicable for renting a vehicle with us</li>
                        </ul>
                        <h1 className='pt-8 font-bold text-xl'>Upload DL</h1>
                        <ul className="list-disc pl-8 ">
                            <li>Please upload both sides of your original driving license or international driving permit</li>
                            <li>Ensure that the images uploaded clearly show your details to ensure faster verification</li>
                        </ul>

                        {documentUpload || user?.document && user?.document.length > 0 ? (
                            <div className='ml-5 mt-10 flex items-center'>
                                <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h1 className='font-bold text-xl'>Document uploaded</h1>
                            </div>

                        ) : (
                            <div>
                                <div className='flex ml-10 mt-5'>
                                    <div>
                                        <p className='pl-14 font-bold'> Front side</p>
                                        <div className="flex items-center justify-center w-44 ml-2">
                                            {frontDoc ? (
                                                // <img src={frontDoc} alt="" />
                                                <div className="w-full h-56 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${frontDoc})` }}>
                                                </div>
                                            ) : (
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-400 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-4 pb-5">

                                                        <div className="flex flex-col items-center justify-center">
                                                            <svg className="w-8 h-8 mb-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="text-xs text-gray-900 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p className="text-xs text-gray-900 text-center">SVG, PNG, JPG </p>
                                                        </div>

                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={frontSideDoc} />
                                                </label>
                                            )}

                                        </div>
                                    </div>
                                    <div>
                                        <p className='pl-14 font-bold'>Back side</p>
                                        <div className="flex items-center justify-center w-44 ml-2">
                                            {
                                                backDoc ? (
                                                    // <img src={backDoc} alt="" />
                                                    <div className="w-full h-56 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${backDoc})` }}>
                                                    </div>
                                                ) : (
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-400 dark:bg-gray-200 hover:bg-gray-100 dark:border-gray-600">
                                                        <div className="flex flex-col items-center justify-center pt-4 pb-5">

                                                            <div className="flex flex-col items-center justify-center">
                                                                <svg className="w-8 h-8 mb-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                                </svg>
                                                                <p className="text-xs text-gray-900 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                                <p className="text-xs text-gray-900 text-center">SVG, PNG, JPG </p>
                                                            </div>

                                                        </div>
                                                        <input id="dropzone-file" type="file" className="hidden" onChange={backSideDoc} />
                                                    </label>
                                                )
                                            }

                                        </div>



                                    </div>
                                </div>
                                <div className='ml-36 mt-6'>
                                    <button onClick={handleDocument} className='w-36 h-8 mb-3 bg-yellow-500 rounded-2xl border border-gray-600 font-bold'>Upload License</button>
                                </div>
                            </div>
                        )}


                    </div>
                </div>


            </div>
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default UserProfile
