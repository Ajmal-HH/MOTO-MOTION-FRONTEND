import { useEffect, useState } from 'react';
import Header from '../../Components/UserSide/Header';
import axios from '../../utils/axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { dateValidationSchema } from '../../FormValidation';
import { toast } from 'react-toastify';
import { FaUser, FaStar } from "react-icons/fa";
import Footer from '../../Components/UserSide/Footer';
import Pagination from '../../Components/All/Pagination';

function BikeDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bikeId = searchParams.get('bikeId');
  const [bike, setBike] = useState({});
  const [pickupDate, setPickupDate] = useState();
  const [dropoffDate, setDropoffDate] = useState();
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [errors, setErrors] = useState({});
  const [notavbl, setNotavbl] = useState('');

  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios.get(`/bike-details?bikeId=${bikeId}`)
      .then((response) => {
        const data = response.data;
        setBike(data);
      })
      .catch((error) => {
        console.log('Error fetching bike details:', error);
      });
  }, [bikeId]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ensure bike.reviews is defined and not empty
  const reviews = bike?.reviews ? [...bike.reviews].reverse() : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const records = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = async (id, e) => {
    e.preventDefault();
    try {
      await dateValidationSchema.validate({ pickupDate, dropoffDate, pickupTime, dropoffTime }, { abortEarly: false });
      axios.post('/checkavailibility', { pickupDate, dropoffDate, pickupTime, dropoffTime, id })
        .then(() => {
          setNotavbl('');
          navigate(`/checkout?bikeId=${bikeId}&pickUp=${pickupDate}&dropOff=${dropoffDate}`);
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          if (message) {
            if (message === 'awaiting for document upload') {
              navigate('/userprofile');
              toast.error('Please upload the documents');
            } else if (message === 'verifying document') {
              toast.error(message);
              setNotavbl(message);
            }else if (message === 'User is Blocked' || message === 'Auth failed'){
              navigate('/')
              toast.error(message)       
            } else {
              toast.error(message);
              setNotavbl(message);
            }
          } else {
            toast.error('An error occurred. Please try again later.');
          }
        });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };



  return (
    <div>
      <Header />
      {bike && bike?.image?.length > 0 && (
        <div className='mt-20 font-googleFont'>
          <div className='w-full h-[420px]  bg-white flex  justify-center'>
            <div className='w-[550px] h-96 bg-white mx-2 my-4 flex justify-center items-center'>
              <div className='w-[530px] h-80 rounded-xl border border-gray-400 relative overflow-hidden'>
                <img
                  src={`${bike?.image[0]}`}
                  className="img-fluid absolute inset-0 w-full h-full object-cover rounded-xl"
                  alt="Bike Image"
                />
              </div>
            </div>
            <div className='w-[500px] h-96 bg-white my-4'>
              <div className='w-[480px] h-44 mx-2 my-3 bg-white rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden'>
                <img
                  src={`${bike?.image[1]}`}
                  className="img-fluid  max-w-full max-h-full"
                  alt="Bike Image"
                />
              </div>
              <div className='w-[480px] h-44 mx-2 my-3 bg-white rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden'>
                <img
                  src={`${bike?.image[2]}`}
                  className="img-fluid max-w-full max-h-full"
                  alt="Bike Image"
                />
              </div>
            </div>
          </div>
          <div className='w-full h-auto bg-slate-200 flex justify-center'>
            <div className='w-[800px] h-auto bg-white '>
              <h1 className='font-bold text-4xl pl-5'>{bike.bike_name}</h1>
              <p className='pl-5 font-bold'>Bike Rent/day : {bike.price} </p>
              <p className='pl-5 pt-5'>Bike type : {bike.bike_type} </p>
              <p className='pl-5'>Bike No : {bike.bike_number} </p>
              <p className='pl-5'>Bike CC : {bike.bike_cc} </p>
              <p className='pl-5'>Bike location : {bike.location} </p>
              <p className='pl-5'>Bike Details : {bike.details} </p>
              <p className='pl-5 pt-5 '>Rating & Reviews</p>
              <p className='pl-5 flex'><FaStar size={20} color={'#ffc107'} />4 ({bike.reviews?.length} Reviews)</p>

              {/* <div className='flex pl-5 mt-5'>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name='rating'
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        className='cursor-pointer'
                        size={35}
                        color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              <div className='flex flex-col mt-5 pl-5'>
                <label>Add your review</label>
                <input
                  type="text"
                  placeholder='Add your review'
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className='w-96 h-20 pl-2 border border-yellow-500'
                />
                <button onClick={handleReview} className='w-28 h-9 mt-2 bg-yellow-500 rounded-md'>ADD REVIEW</button>
              </div> */}
              <div className='w-full mt-5 h-12 bg-gray-500 flex items-center pl-5'>
                <h1 className='font-bold text-xl '>Ride Reviews</h1>
              </div>
              <div className='w-full h-auto border border-gray-500 pl-5'>
                {bike.reviews && bike.reviews.length > 0 ? (
                  records.map((item, index) => (
                    <div className='border border-gray-400 rounded-md mt-3 mr-5 pl-3 mb-2' key={index}>
                      <p className='flex'><FaUser className='mt-1' size={16} /><strong className='pl-2'>{item?.username}</strong></p>
                      <p className='pl-6'>{item?.review}</p>
                      <p className='pl-6 text-xs'>{formatDate(item?.date)}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
                {bike.reviews && bike.reviews.length > 0 ? (
                   <Pagination
                   itemsPerPage={itemsPerPage}
                   totalItems={bike.reviews?.length || 0}
                   paginate={paginate}
                   currentPage={currentPage}
                 />
                ) : ""}
               
              </div>
            </div>
            <div className='bg-gray-500 w-72 h-72 rounded-2xl border border-gray-400 flex flex-col justify-center'>
              {notavbl && <p className='text-red-500 text-center'>{notavbl}</p>}
              <h1 className='mt-2 font-bold font-googleFont text-lg text-center'>SEARCH YOU NEXT RIDE</h1>
              <form onSubmit={(e) => handleSubmit(bike._id, e)} className='ml-7'>
                <label className='font-googleFont text-lg'>Pickup</label>
                <br />
                <input
                  type="date"
                  className='h-8 bg-[#D9D9D9] rounded-l-md pl-2'
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={today}
                />
                <input
                  type="time"
                  onChange={(e) => setPickupTime(e.target.value)}
                  className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
                />
                {(errors.pickupDate || errors.pickupTime) && (
                  <div className='text-red-600'>{errors.pickupDate || errors.pickupTime}</div>
                )}
                <label className='font-googleFont text-lg'>Dropoff</label>
                <br />
                <input
                  type="date"
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className='h-8 bg-[#D9D9D9] rounded-l-md pl-2'
                  min={today}
                />
                <input
                  type="time"
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
                />
                {(errors.dropoffDate || errors.dropoffTime) && (
                  <div className='text-red-600'>{errors.dropoffDate || errors.dropoffTime}</div>
                )}
                <div className='flex justify-center mt-5 mr-8'>
                  <button type='submit' className='bg-[#FFB016] font-googleFont font-bold rounded-md w-60 h-7 text-center'>Book Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default BikeDetails;
