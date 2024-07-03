import { useEffect, useState } from 'react';
import Header from '../../Components/UserSide/Header';
import axios from '../../utils/axiosConfig';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../Components/All/Pagination';
import Footer from '../../Components/UserSide/Footer';

function Bikes() {
    const [bikes, setBikes] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ price: '', location: '', bikeType: '' });

    useEffect(() => {
        fetchInitialBikes();
    }, []);

    useEffect(() => {
        if (filters.price || filters.location || filters.bikeType) {
            fetchFilteredBikes();
        } else {
            fetchInitialBikes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const fetchInitialBikes = () => {
        axios.get(`/bikes`)
            .then(response => {
                setBikes(response.data);
            })
            .catch(error => {
                console.error('Error fetching bike details:', error);
                toast.error('An error occurred, please try again later.');
            });
    };

    const fetchFilteredBikes = () => {
        const { price, location, bikeType } = filters;

        axios.get(`/filterbikes`, {
            params: { price, location, biketype: bikeType }
        })
            .then(response => {
                setBikes(response.data);
            })
            .catch(error => {
                console.error('Error fetching bike details:', error);
                toast.error('An error occurred, please try again later.');
            });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16); // Items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const records = bikes.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='font-googleFont'>
            <Header />
            <div className='w-full h-20 bg-white'>
                <h1 className='text-center text-2xl font-bold mt-20'>Bike rentals in Cochin</h1>
                <p className='text-center text-xl'>*All prices are exclusive of taxes and fuel. Images used for representation purposes only, actual color may vary.</p>
            </div>
            <div className='w-full h-20 flex pl-8'>
                <div>
                    <h1>Type:</h1>
                    <select
                        name='bikeType'
                        className='w-32 h-10 border border-gray-300 rounded-sm'
                        onChange={handleFilterChange}
                    >
                        <option value=''>All bikes</option>
                        <option value='Scooter'>Scooter</option>
                        <option value='Sports'>Sports Bike</option>
                        <option value='Touring'>Touring Bike</option>
                        <option value='Adventure'>Adventure Bike</option>
                    </select>
                </div>
                <div className='pl-8'>
                    <h1>Sort by:</h1>
                    <select
                        name='price'
                        className='w-32 h-10 border border-gray-300 rounded-sm'
                        onChange={handleFilterChange}
                    >
                        <option value=''>All bikes</option>
                        <option value='Low-High'>Low-High</option>
                        <option value='High-Low'>High-Low</option>
                    </select>
                </div>
                <div className='pl-8'>
                    <h1>Location:</h1>
                    <select
                        name='location'
                        className='w-32 h-10 border border-gray-300 rounded-sm'
                        onChange={handleFilterChange}
                    >
                        <option value=''>All Locations</option>
                        <option value='Fort kochi'>Fort kochi</option>
                        <option value='Edapally'>Edapally</option>
                        <option value='Kaloor'>Kaloor</option>
                        <option value='Aluva'>Aluva</option>
                        <option value='Ernakulam south'>Ernakulam south</option>
                        <option value='kallamasheri'>kallamasheri</option>
                    </select>
                </div>
                <div className='pl-8 pt-6'>
                    <input
                        type='text'
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-96 h-10 pl-2 border border-gray-300 rounded-sm'
                    />
                </div>
            </div>

            <div className='flex flex-wrap justify-start'>
                {records.filter((item) => {
                    return search.toLowerCase() === ''
                        ? item
                        : item.bike_name.toLowerCase().includes(search.toLowerCase());
                }).map(bike => (
                    <div key={bike._id} className='w-72 h-[400px] bg-white border border-gray-300 rounded-xl flex flex-col items-center m-6'>
                        <div className='w-64 h-52 bg-white flex flex-col items-center'>
                            <h1>{bike.bike_name}</h1>
                            <div className='w-60 h-44 bg-white border border-gray-300 rounded-lg'>
                                <img
                                    src={`${bike.image[0]}`}
                                    className='object-cover w-full h-full rounded-lg'
                                    alt='Bike'
                                />
                            </div>
                        </div>
                        <div className='w-64 h-10 bg-white border border-b-[#FFB016] flex items-center justify-center'>
                            <h3>DAILY</h3>
                        </div>
                        <div className='w-64 h-24 pt-5 bg-white border border-gray-300'>
                            <p>(Min 1 day booking only)</p>
                            <p className='pl-10'>Book per-day @ ₹ {bike.price}</p>
                        </div>
                        <Link to={`/bike-details?bikeId=${bike._id}`} className='bg-[#FFB016] w-64 h-10 rounded-lg flex justify-center items-center'>
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={bikes.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <div className='mt-16'>
                <Footer />
            </div>
        </div>
    );
}

export default Bikes;
