import { useEffect, useState } from "react"
import axios from '../utils/axiosConfig'
import { toast } from "react-toastify"


const useGetConverstaions = () =>{
    const [loading,setLoading]  =useState(false)
    const [conversations, setConversations] = useState([])
    

    useEffect(()=>{
        const getConverstaions = async () =>{
            setLoading(true)
            try {
                axios.get('/admin/users')
                .then((response)=>{
                    setConversations(response.data)
                })
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        getConverstaions()
    },[])
    return {loading, conversations}
}
export default useGetConverstaions