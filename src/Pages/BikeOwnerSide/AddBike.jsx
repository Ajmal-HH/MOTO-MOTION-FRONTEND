import { useState } from 'react'
import BikeOwnerSidebar from '../../Components/BikeOwnerSide/BikeOwnerSidebar'
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { addBikeValidationSchema } from '../../FormValidation'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/All/Loader'



function AddBike() {
    const [bikeName, setBikeName] = useState('')
    const [bikeNO, setBikeNo] = useState('')
    const [location, setLocation] = useState('')
    const [bikeCC, setBikeCC] = useState()
    const [rent, setRent] = useState()
    const [bikeType, setBikeType] = useState('')
    const [image, setImage] = useState([])
    const [details, setDetails] = useState('')
    const [address, setAddress] = useState('')
    const [pinCode, setPinCode] = useState()
    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const bikeOwnerData = JSON.parse(localStorage.getItem('bikeOwnerData')); 



    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            await addBikeValidationSchema.validate(
                { bikeName, bikeNO, location, rent, bikeType, bikeCC, details, image, address, pinCode },
                { abortEarly: false }
            );
            const formData = new FormData()
            //formData.append("image" , image); 
            image.forEach((file) => {
                formData.append(`image`, file);
            });
            formData.append("bikeName", bikeName);
            formData.append("bikeNO", bikeNO);
            formData.append("location", location);
            formData.append("rent", rent);
            formData.append("bikeType", bikeType);
            formData.append("bikeCC", bikeCC);
            formData.append("details", details);
            formData.append("address", address)
            formData.append("pinCode", pinCode)

            axios.post(`/bikeowner/addbike`, {formData, bikeOwnerData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    setLoader(false)
                    toast.success('New bike added')
                    navigate('/bikeowner-bikedetails')
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        setLoader(false)
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('An error occurred. Please try again later.');
                    }
                })
        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message; // Specific error messages
                });
                setErrors(newErrors);
            } else {
                console.error(error);
                toast.error('An error occurred. Please try again later.');
            }
        }

    }

    return (
        <div className="flex justify-center items-center">
            <BikeOwnerSidebar />
            <div className="bg-gray-200 w-full font-googleFont p-8 rounded-lg">

            <div className="bg-gray-200 w-full font-googleFont p-8 rounded-lg">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-6">ADD BIKE</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="bikeName" className="block text-sm font-semibold text-gray-700">
                                        Bike Name
                                    </label>
                                    <input
                                        type="text"
                                        id="bikeName"
                                        name="bikeName"
                                        placeholder="Enter bike name"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setBikeName(e.target.value)}
                                    />
                                    {errors.bikeName && (
                                        <div className="text-red-600 text-xs mb-2">{errors.bikeName}</div> // Dynamic error display
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="bikeLocation" className="block text-sm font-semibold text-gray-700">Bike Location</label>
                         
                                    <select className=' border border-gray-400 w-full pl-2' onChange={(e) => setLocation(e.target.value)}>
                                        <option value="">select</option>
                                        <option value="Fort kochi">Fort kochi</option>
                                        <option value="Edapally">Edapally</option>
                                        <option value="Kaloor">Kaloor</option>
                                        <option value="Aluva">Aluva</option>
                                        <option value="Ernakulam south">Ernakulam south</option>
                                        <option value="kallamasheri">kallamasheri</option>
                                    </select>
                                    {errors.location && <div className='text-red-600'>{errors.location}</div>}
                                </div>
                                <div>
                                    <label htmlFor="bikeLocation" className="block text-sm font-semibold text-gray-700">Address</label>
                                    <input type="text"
                                        id="address"
                                        name='address'
                                        placeholder="Enter the address"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {errors.address && <div className='text-red-600'>{errors.address}</div>}
                                </div>
                                <div>
                                    <label htmlFor="bikeLocation" className="block text-sm font-semibold text-gray-700">Pin code</label>
                                    <input type="number"
                                        id="pinCode"
                                        name='pinCode'
                                        placeholder="Enter pincode"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setPinCode(e.target.value)}
                                    />
                                    {errors.pinCode && <div className='text-red-600'>{errors.pinCode}</div>}
                                </div>
                                <div>
                                    <label htmlFor="bikeCC" className="block text-sm font-semibold text-gray-700">Bike CC</label>
                                    <input type="number"
                                        id="bikeCC"
                                        name='bikeCC'
                                        placeholder="Enter bike cc"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setBikeCC(e.target.value)}
                                    />
                                    {errors.bikeCC && <div className='text-red-600'>{errors.bikeCC}</div>}

                                </div>
                                <div>
                                    <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Rent</label>
                                    <input type="number"
                                        id="rent"
                                        name='rent'
                                        placeholder="Enter bike rent"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setRent(e.target.value)}
                                    />
                                    {errors.rent && <div className='text-red-600'>{errors.rent}</div>}

                                </div>
                                <div>
                                    <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Type</label>
                                    {/* <input type="text"
                                    id="bikeType"
                                    name='bikeType'
                                    placeholder="Enter bike type"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setBikeType(e.target.value)}
                                /> */}
                                    <select className='border border-gray-400 w-full pl-2' onChange={(e) => setBikeType(e.target.value)}>
                                        <option value="">select</option>
                                        <option value="Scooter">Scooter</option>
                                        <option value="Sports">Sports Bike</option>
                                        <option value="Touring">Touring Bike</option>
                                        <option value="Adventure">Adventure Bike</option>
                                    </select>
                                    {errors.bikeType && <div className='text-red-600'>{errors.bikeType}</div>}

                                </div>
                                <div>
                                    <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Details</label>
                                    <input type="text"
                                        id="details"
                                        name='details'
                                        placeholder="Enter bike details"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                    {errors.details && <div className='text-red-600'>{errors.details}</div>}

                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Bike Number</label>
                                    <input type="text"
                                        id="bikeNO"
                                        name='bikeNO'
                                        placeholder="Enter bike number"
                                        className="input-field border border-gray-400 w-full pl-2"
                                        onChange={(e) => setBikeNo(e.target.value)}
                                    />
                                    {errors.bikeNO && <div className='text-red-600'>{errors.bikeNO}</div>}

                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Add Image </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        placeholder="Add images"
                                        className="input-field"
                                        accept="image/png, image/jpeg, image/jpg"
                                        multiple
                                        onChange={(e) => {
                                            console.log(e.target.files);
                                            const files = Array.from(e.target.files);
                                            setImage(files);
                                        }}
                                    />
                                    {errors.image && <div className='text-red-600'>{errors.image}</div>}

                                </div>
                            </div>

                            <button type="submit" className="w-full flex justify-center py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-75">
                                {loader ? <Loader /> : "ADD BIKE" }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AddBike
