import axios from '../../utils/axiosConfig'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar';
import SalesReport from '../../Components/AdminSide/SalesReport';
import UserBarChart from '../../Components/AdminSide/UserBarChart';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


function AdminDashboard() {
  const [totalBookings, setTotalBookings] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [totalbikeOwners, setTotalBikeOwners] = useState(0)
  const [totalbikes, setTotalBikes] = useState(0)
  const [totalrevenue, setTotalRevenue] = useState(0)
  const [monthlySales, setMonthlySales] = useState([])
  const [usersGrowth, setUsersGrowth] = useState([])
  const [partnersGrowth, setPartnerGrowth] = useState([])
  const [users] = useState('User')
  const [partners] = useState('Partners')
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    axios.get('/admin/admin-dash')
      .then((response) => {
        const { bookings, customers, bikeOwners, bikes, totalRevenue, monthlySalesArray, usersGrowthArray, partnersGrowthArray } = response.data
        setTotalBookings(bookings)
        setTotalCustomers(customers)
        setTotalBikeOwners(bikeOwners)
        setTotalBikes(bikes)
        setTotalRevenue(totalRevenue)
        setMonthlySales(monthlySalesArray)
        setUsersGrowth(usersGrowthArray)
        setPartnerGrowth(partnersGrowthArray)
      })
  }, [])

  useEffect(() => {
    axios.get('/admin/admin-bookinglist')
        .then((response) => {
            const data = response.data
            setBookingList(data.reverse());
        })
        .catch(() => {
            toast.error('Error fetching bike details');
        });
}, []);

// Helper function to format date
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const handleAction = (bookingId, action) => {
    axios.get(`/bikeowner/action-booking?bookingId=${bookingId}&action=${action}`)
        .then(() => {
            const updatedBookingList = bookingList.map(booking => {
                if (booking._id === bookingId) {
                    return { ...booking, booking_status: action };
                }
                return booking;
            });
            setBookingList(updatedBookingList);
            toast.success(`Booking ${action.charAt(0).toUpperCase() + action.slice(1)}!`);
        })
        .catch(error => {
            console.error(`Error ${action} booking:`, error);
            toast.error(`Failed to ${action} booking`);
        });
};

  return (
    <div className="w-full flex ">
      <Adminsidebar />
      <div className="w-full p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="stats shadow p-5">
            <div className="stat">
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value">{totalrevenue}</div>
              <div className="stat-desc">27% more than last month</div>
            </div>
          </div>
          <div className="stats shadow p-5">
            <div className="stat">
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value">{totalBookings}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow p-5">
            <div className="stat">
              <div className="stat-title">Total Customers</div>
              <div className="stat-value">{totalCustomers}</div>
              <div className="stat-desc">23% more than last month</div>
            </div>
          </div>
          <div className="stats shadow p-5">
            <div className="stat">
              <div className="stat-title">Total Partners</div>
              <div className="stat-value">{totalbikeOwners}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow p-5">
            <div className="stat">
              <div className="stat-title">Total Bikes</div>
              <div className="stat-value">{totalbikes}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-green-400 p-5 rounded shadow w-full h-[400px]">
          <SalesReport monthlySales={monthlySales} />
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-yellow-200 p-5 rounded shadow h-[400px]">
            <h1 className="text-center mb-4">User Statistics for June 2024</h1>
            <UserBarChart Growth={usersGrowth} about={users} />
          </div>
          <div className="bg-red-200 p-5 rounded shadow h-[400px]">
            <h1 className="text-center mb-4">Partners Statistics for June 2024</h1>
            <UserBarChart Growth={partnersGrowth} about={partners} />
          </div>
        </div>

        <div className='flex flex-col flex-1 bg-gray-200 font-googleFont mt-5'>
                <h1 className='text-center text-2xl pt-3'>Latest 5 Booking List</h1>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Days</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th colSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookingList.slice(0, 5).map((booking, index) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{ index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-32 h-32 rounded-md mb-3 object-cover bg-pink-300">
                                            {booking && booking.bike.image && booking.bike?.image.length > 0 && <img src={`${booking.bike.image[0]}`} className="object-cover w-full h-full rounded-lg " alt="Bike Image" />
                                            }
                                            <p className="text-center ">{booking.bike.bike_name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(booking.pickup_date)} <td /> to <td /> {formatDate(booking.dropoff_date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{booking.day}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{booking.total_amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{booking.booking_status}</td>
                                    {booking && booking.booking_status === 'canceled' ? (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className=' rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-300 text-red-400  hover:bg-red-300 hover:text-white '>
                                                <h1>Canceled</h1>
                                            </div>
                                        </td>
                                    ) : (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                 <div>
                                                <select onChange={(e) => handleAction(booking._id, e.target.value)} className='rounded-lg w-full h-7 flex justify-center items-center mt-2 bg-blue-500 border text-white cursor-pointer'>
                                                    <option value="" disabled selected>Select Action</option>
                                                    <option value="canceled">Cancel</option>
                                                    <option value="pickup">PickUp</option>
                                                    <option value="dropoff">DropOff</option>
                                                </select>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
