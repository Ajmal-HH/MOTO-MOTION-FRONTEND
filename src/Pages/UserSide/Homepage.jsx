import { useEffect, useState } from 'react'
import banner1 from '../../assets/banner2.jpg'
import banner2 from '../../assets/banner3.jpg'
import trip1 from '../../assets/trip1.webp'
import trip2 from '../../assets/trip2.jpg'
import trip3 from '../../assets/trip3.jpeg'
import trip4 from '../../assets/trip4.jpg'
import trip5 from '../../assets/trip5.jpg'
import trip6 from '../../assets/trip6.webp'
import trip7 from '../../assets/trip7.jpg'
import trip8 from '../../assets/trip8.jpg'
import Footer from '../../Components/UserSide/Footer'
import Header from '../../Components/UserSide/Header'
import axios from '../../utils/axiosConfig'
import { Link } from 'react-router-dom'

function Homepage() {
    const [bikes,setBikes] = useState([])
    
    useEffect(()=>{
        axios.get('/load-home')
        .then((response)=>{
            setBikes(response.data)
        })
    })
  return (
    <div>
    <div className='w-full h-[450px] bg-cover ' style={{backgroundImage: `url(${banner1})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
 <Header />
</div>
     <div className='w-full bg-white h-36 flex flex-row'>
         <div className='w-52 h-32 bg-white ml-12 flex items-center'>
             <h1 className='font-bold text-[90px]'>1</h1>
             <p className='font-googleFont font-bold'>Select Bike</p>
         </div>
      
         <div className='w-52 h-32 bg-white ml-14 flex items-center'>
             <h1 className='font-bold text-[90px]'>2</h1>
             <p className='font-googleFont font-bold'>Select Date & Time</p>
         </div>
      
         <div className='w-52 h-32 bg-white ml-14 flex items-center'>
             <h1 className='font-bold text-[90px]'>3</h1>
             <p className='font-googleFont font-bold'>Update Documents</p>
         </div>
      
         <div className='w-52 h-32 bg-white ml-14 flex items-center'>
             <h1 className='font-bold text-[90px]'>4</h1>
             <p className='font-googleFont font-bold'>Make Payments</p>
         </div>
         <div className='w-52 h-32 bg-white ml-14 flex items-center'>
             <h1 className='font-bold text-[90px]'>5</h1>
             <p className='font-googleFont font-bold'>Enjoy your Ride</p>
         </div>
     </div>

   <div className='bg-slate-400 w-full h-[450px] flex justify-end' style={{backgroundImage: `url(${banner2})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
     <div className='bg-white w-72 h-60 mr-32 mt-16 rounded-2xl '>
         <h1 className='mt-2 font-bold font-googleFont text-lg text-center'>SEARCH YOU NEXT RIDE</h1>
         <form className='ml-5'>
             <label className='font-googleFont text-lg'>Pickup</label>
             <br />
             <input type="date" 
             className=' h-8 bg-[#D9D9D9] rounded-l-md pl-2'
             />
             <input type="time" 
             placeholder='Date'
             className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
             />
             <label className='font-googleFont text-lg '>Dropoff</label>
             <br />
             <input type="date" 
             className='h-8 bg-[#D9D9D9] rounded-l-md pl-2'
             />
             <input type="time" 
             placeholder='Date'
             className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
             />
             <div className='flex justify-center mt-5 mr-5'>
             <div  className='bg-[#FFB016] font-googleFont font-bold  rounded-2xl w-20 h-7 text-center '>SEARCH</div>
             </div>
         </form>
     </div>
   </div>
   <div className='bg-[#E8E488] w-full h-56 flex justify-between'>
   {
    bikes.slice(0, 4).map((bike, index) => (
        <div key={index} className='bg-white w-52 h-52 mt-2 ml-20 mr-20 rounded-lg flex flex-col items-center'>
            <div className='bg-white w-36 h-36 rounded-lg mt-2 border border-gray-500 flex items-center justify-center'>
                <img src={bike.image[0]} alt={bike.bike_name} className='max-w-full rounded-lg max-h-full'/>
            </div>
            <h1 className='font-googleFont mt-1'>{bike.bike_name}</h1>
            <Link to={`/bike-details?bikeId=${bike._id}`} className='bg-[#FFB016] font-googleFont rounded-2xl w-20 h-5 flex items-center justify-center '>Book Now</Link>
        </div>
    ))
}


   </div>
   <div className='w-full h-[600px] bg-white'>
     <div className='w-full h-24 '>
         <h1 className='text-center font-googleFont font-bold text-[50px] '>Our impact in <span className='text-[#FFB016]'>numbers</span></h1>
     </div>
     <div className='w-full h-48  flex justify-between'>
         <div className='w-52 h-40 bg-white ml-20'>
             <h1 className='ml-16 font-bold pt-12 text-3xl text-[#FFB016] '>1M +</h1>
             <h1 className='ml-20 font-bold text-xl'>Users trust us</h1>
         </div>

         <div className='w-40 h-40 bg-white rounded-b-xl bg-cover' style={{background : `url(${trip1})`,backgroundSize : 'cover',backgroundPosition : 'center'}}>
           </div>
         <div className='w-40 h-40 bg-white rounded-b-xl ' style={{background : `url(${trip2})`,backgroundSize : 'cover',backgroundPosition : 'center'}}>

         </div>
         <div className='w-52 h-40 bg-white mr-20'>
             <h1 className='font-bold pt-12 text-3xl text-[#FFB016]  '>50M +</h1>
             <h1 className='font-bold text-xl'>Kms travelled</h1>
         </div>
     </div>
     <div className='w-full h-40 flex justify-between mt-2'>
         <div className='w-40 h-40 bg-white ml-40 rounded-xl' style={{background : `url(${trip3})`,backgroundSize : 'cover',backgroundPosition : 'center'}}></div>
         <div className='w-40 h-40 bg-white rounded-xl' style={{background : `url(${trip4})`,backgroundSize : 'cover',backgroundPosition : 'center'}}></div>
         <div className='w-40 h-40 bg-white rounded-xl' style={{background : `url(${trip5})`,backgroundSize : 'cover',backgroundPosition : 'center'}} ></div>
         <div className='w-40 h-40 bg-white mr-40 rounded-xl' style={{background : `url(${trip6})`,backgroundSize : 'cover',backgroundPosition : 'center'}}></div>
     </div>
     <div className='w-full h-48  flex justify-between mt-8'>
         <div className='w-52 h-40 bg-white ml-20'>
             <h1 className='ml-16 font-bold pt-12 text-3xl text-[#FFB016] '>10K +</h1>
             <h1 className='ml-20 font-bold text-xl whitespace-nowrap '>Earning with us</h1>
         </div>

         <div className='w-40 h-40 bg-white rounded-b-xl bg-cover' style={{background : `url(${trip7})`,backgroundSize : 'cover',backgroundPosition : 'center'}}>
           </div>
         <div className='w-40 h-40 bg-white rounded-b-xl ' style={{background : `url(${trip8})`,backgroundSize : 'cover',backgroundPosition : 'center'}}>

         </div>
         <div className='w-52 h-40 bg-white mr-20'>
             <h1 className='font-bold pt-12 text-3xl text-[#FFB016]  '>200K +</h1>
             <h1 className='font-bold text-xl'>Seamless Booking</h1>
         </div>
     </div>
   </div>
   <div className='mt-16'>
   <Footer />
   </div>
 </div>
  )
}

export default Homepage
