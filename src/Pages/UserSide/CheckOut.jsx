import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/UserSide/Header";
import { useEffect, useState } from "react";
import axios from '../../utils/axiosConfig';
import { toast } from "react-toastify";

function CheckOut() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bikeId = searchParams.get('bikeId');
    const pickUp = searchParams.get('pickUp');
    const dropOff = searchParams.get('dropOff');
    const [bike, setBike] = useState({});
    const [day, setDay] = useState(0);
    const [total, setTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [CGST, setCGST] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/checkout?bikeId=${bikeId}`)
            .then((response) => {
                const bikeData = response.data;
                setBike(bikeData);
                const differenceInTime = Math.abs(new Date(dropOff) - new Date(pickUp));
                const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
                setDay(differenceInDays);
                const calculatedTotal = bikeData.price * differenceInDays;
                setTotal(calculatedTotal);
                const calculatedCGST = (calculatedTotal * 0.14).toFixed(2);
                setCGST(calculatedCGST);
                setGrandTotal(calculatedTotal + (calculatedCGST * 2) - coupon);
            })
            .catch((error) => {
                console.log('error fetching bike details:', error);
            });
    }, [bikeId, pickUp, dropOff, coupon]);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/bike-booking', { pickUp, dropOff, bikeId, grandTotal, day })
            .then((response) => {
                console.log(response,"123456");
                if (response.data.url) {
                    window.location.href = response.data.url; // Redirect to Stripe checkout page
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                    navigate('/bikes');
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div>
            <Header />
            <div className="w-full h-screen bg-white flex justify-center font-googleFont">
                <div className="w-[750px] h-[500px] mt-20 flex border border-gray-400 rounded-lg pl-4">
                    <div className="w-52 h-[500px] flex flex-col items-center justify-center">
                        <div className="w-40 h-36 rounded-lg border border-gray-400">
                            {bike && bike.image && bike?.image.length > 0 && <img src={`${bike.image[0]}`} className="object-cover w-full h-full rounded-lg " alt="Bike Image" />}
                        </div>
                        <h1>{bike.bike_name}</h1>
                    </div>
                    <div className="w-full h-[500px]">
                        <div className="w-full h-28 mt-16 pl-10 pr-10 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <p>4:30pm</p>
                                <p>{pickUp}</p>
                            </div>
                            <p>to</p>
                            <div>
                                <p>4:30pm</p>
                                <p>{dropOff}</p>
                            </div>
                        </div>
                        <div className="pl-10 pt-10 text-lg">
                            <p>{bike.location}</p>
                            <p>{bike.address}</p>
                            <p>Pin: {bike.pinCode}</p>
                        </div>
                        <div className="pl-10 pt-10">
                            <p className="mt-10 text-lg">Charges: {bike.price}/day * {day} days <span className="ml-[215px]">₹{total}</span></p>
                            <h1 className="mt-4 font-bold text-xl">Total: <span className="ml-[376px]">₹{total}</span></h1>
                        </div>
                    </div>
                </div>
                <div className="w-[400px] h-[500px] mt-20 ml-1 rounded-lg flex flex-col">
                    <div className="w-[400px] h-28 border border-gray-400 flex justify-center items-center rounded-t-lg">
                        <input type="text"
                            placeholder="Coupon Code"
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-56 h-10 rounded-l-2xl border border-yellow-500 pl-3" />
                        <button className="bg-black text-yellow-500 ml-1 h-10 w-24 rounded-r-2xl">Apply</button>
                    </div>
                    <div className="w-[400px] h-[384px] border border-gray-400 rounded-b-lg mt-1 pt-10 text-lg">
                        <p className="mb-5 pl-10">Booking fee <span className="ml-[165px]">₹{total}</span></p>
                        <p className="mb-5 pl-10">CGST (14%) <span className="ml-[167px]">₹{CGST}</span></p>
                        <p className="mb-5 pl-10">SGST (14%) <span className="ml-[167px]">₹{CGST}</span></p>
                        <p className="mb-5 pl-10">Coupon <span className="ml-[195px]">₹{coupon}</span></p>
                        <h1 className="pl-10 font-bold">Total Payable Amount <span className="ml-24">₹{grandTotal}</span></h1>
                        <div className="flex justify-center items-center">
                            <button onClick={onSubmit} className="w-48 h-7 bg-yellow-500 mt-10 rounded-lg text-black">Make Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
