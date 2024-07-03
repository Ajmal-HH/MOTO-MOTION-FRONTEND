




import { useEffect, useState } from "react";
import Header from "../../Components/UserSide/Header";
import axios from '../../utils/axiosConfig';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../../Components/All/Pagination";
import Swal from "sweetalert2";
import Footer from "../../Components/UserSide/Footer";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaStar } from "react-icons/fa";



function UserBookingList() {
  const [userBookingList, setUserBookingList] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');


  // Helper function to format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };



  const handleClick = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.get(`/cancel-booking?bookingId=${bookingId}`)
          const updatedBookingList = userBookingList.map(booking => {
            if (booking._id === bookingId) {
              return { ...booking, booking_status: 'canceled' };
            }
            return booking;
          });
          setUserBookingList(updatedBookingList);
          toast.success('Booking Canceled!');
        } catch (error) {
          console.error('Error cancel booking:', error);
          toast.error('Failed to cancel booking');
        }
      }
    });
  }

  useEffect(() => {
    axios.get('/user-bookinglist')
      .then((response) => {
        const data = response.data
        setUserBookingList(data.reverse());
      })
      .catch(() => {
        toast.error('Error in fetching booking details.');
      });
  }, []);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const records = userBookingList.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReview = (bikeId) => {
    axios.post('/bike-review', { review, bikeId })
      .then((response) => {
        const {message} = response.data
        toast.success(message);
        setReview('');
      })
      .catch((error) => {
        console.log('Error adding review:', error);
        toast.error('Failed to add review. Please try again later.');
      });
  };


  return (
    <div className="font-googleFont  bg-gray-200">
      <Header />
      <div className=' pt-24  ml-2  flex'>
        <Link to={'/userprofile'} className='bg-yellow-500 ml-4 w-32 h-6 rounded-md text-center'>&larr; Back</Link>
      </div>
      <div className="w-full min-h-screen mt-5">
        {userBookingList.length > 0 ? (
          records.map((booking, index) => (
            <div key={index} className="w-12/12 m-5 border border-gray-400 h-96 rounded-xl flex bg-white">
              <div className="w-60 h-[180px] rounded-md mt-3 ml-3 object-cover bg-pink-300">
                {booking && booking.bike.image && booking.bike?.image.length > 0 && <img src={`${booking.bike.image[0]}`} className="object-cover w-full h-full rounded-lg " alt="Bike Image" />
                }
              </div>
              {/* <img src={booking.bike.image} alt={booking.bike.name} className="w-60 h-full rounded-md ml-2 object-cover bg-pink-300" /> */}
              <div className="flex flex-col ml-10 justify-center">
                <div>
                  <p className="font-semibold text-xl">{booking.bike.bike_name}</p>
                  <p className="text-gray-500">{booking.bike.details}</p>
                </div>
                <div className="flex mt-2">
                  <p>Booking Date: <span className="pr-5">{formatDate(booking.pickup_date)}</span> to <span className="pl-5">{formatDate(booking.dropoff_date)}</span></p>
                </div>
                <p className="mt-2">PickUp Location: {booking.bike.location}</p>
                <p className="mt-2">Booking status: {booking.booking_status}</p>
                <div className='flex  mt-5'>
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
              <div className='flex flex-col mt-5 '>
                <label>Add your review</label>
                <input
                  type="text"
                  placeholder='Add your review'
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className='w-96 h-20 pl-2 border border-yellow-500'
                />
                <button onClick={()=>handleReview(booking.bike_id)} className='w-28 h-9 mt-2 bg-yellow-500 rounded-md'>ADD REVIEW</button>
              </div>
              </div>
              {/* <div className="rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
                  <h1>Cancel Booking</h1>
                </div> */}
              <div className="w-40 h-full mr-10 ml-auto flex justify-center items-center flex-col">
                {booking && booking.booking_status === 'canceled' ? (
                  <div className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-300 text-red-400 hover:bg-red-300 hover:text-white'>
                    <h1>Canceled</h1>
                  </div>
                ) : (
                  booking && booking.booking_status === 'confirmed' ? (
                    <div onClick={() => handleClick(booking._id)} className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
                      <h1>Cancel</h1>
                    </div>
                  ) : (
                    <div className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-yellow-500  hover:bg-yellow-300 '>
                      <h1>{booking.booking_status}</h1>
                    </div>
                  )
                )}
                <Link
                  to={`/chat?recieverId=${booking.bikeOwner_id}&senderId=${booking.user_id}`}
                  className="bg-yellow-500 mt-2 w-24 h-6 flex items-center pl-2 rounded-md cursor-pointer">
                  <MdMarkUnreadChatAlt />Connect
                </Link>
              </div>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
            <p className="text-gray-600 text-lg font-semibold">No bookings available</p>
            <p className="text-gray-500 mt-2">You have no current bookings. Book a bike to get started!</p>
            <Link to={'/bikes'} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Book Now
            </Link>
          </div>
        )}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={userBookingList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div className='mt-16'>
        <Footer />
      </div>
    </div>
  );
}

export default UserBookingList;
