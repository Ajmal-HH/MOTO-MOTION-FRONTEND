import { useEffect, useState } from "react";
import Header from "../../Components/UserSide/Header"
import { LuWallet } from "react-icons/lu";
import axios from '../../utils/axiosConfig'
import { Link } from "react-router-dom";


function Wallet() {
    const [wallet,setWallet] = useState(0)
    useEffect(()=>{
        axios.get('/wallet')
        .then((response)=>{
            setWallet(response.data)
        })
    },[])
  return (
    <div>
      <Header />
      <div className=" w-full h-screen flex flex-col justify-center items-center ">
      <LuWallet size={100} />
      <h1 className="font-bold text-3xl">{wallet}</h1>
        <Link to={'/userprofile'} className='bg-yellow-500 mt-5 w-32 h-6 rounded-md text-center'>&larr; Back</Link>
      </div>
    
    </div>
  )
}

export default Wallet
