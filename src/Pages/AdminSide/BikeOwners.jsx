import  { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '../../Components/All/Pagination'


function BikeOwners() {
    const token = localStorage.getItem('admintoken');
    const navigate = useNavigate()
    const [owner, setOwner] = useState([])



    useEffect(() => {
        if (!token) {
            navigate('/admin')
        }
        axios.get(`/admin/owners`)
            .then(response => {
                setOwner(response.data);
            })
            .catch(error => {
                console.error('Error fetching owner details:', error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleBlock = async (ownerId) => {
        try {
            await axios.get(`/admin/blockOwner?id=${ownerId}`);
            const updatedOwner = owner.map(owner => {
                if (owner._id === ownerId) {
                  return { ...owner, is_blocked : true };
                }
                return owner;
              });
              setOwner(updatedOwner);
            toast.error('Bike owner blocked!');
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('Failed to block user');
        }
    }

    const handleUnblock = async (ownerId) => {
        try {
            await axios.get(`/admin/unblockOwner?id=${ownerId}`);
            const updatedOwner = owner.map(owner => {
                if (owner._id === ownerId) {
                  return { ...owner, is_blocked : false };
                }
                return owner;
              });
              setOwner(updatedOwner);
            toast.success('Bike owner unblocked!');
        } catch (error) {
            console.error('Error unblocking user:', error);
            toast.error('Failed to unblock user');
        }
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const records = owner.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className='w-full flex'>
            <Adminsidebar />
            <div className='flex flex-col flex-1 bg-gray-200 font-googleFont'>
                <h1 className='text-center text-2xl pt-3'>Bike Owners</h1>
                <Link to={'/addowner'} className='bg-blue-500 ml-4 w-52 h-6 rounded-md text-center'>ADD NEW BIKEOWNER</Link>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((owner, index) => (
                                <tr key={owner._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{owner.bikeowner_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{owner.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/admin-loadeditowner?ownerId=${owner._id}`} className='bg-gray-500 text-white px-2 py-1 rounded'>Edit</Link>
                                    </td>                                   
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        {owner.is_blocked ? (
                                            <span className="bg-red-500 text-white px-2 py-1 rounded">Inactive</span>
                                        ) : (
                                            <span className="bg-green-500 text-white px-2 py-1 rounded">Active</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {owner.is_blocked ? (
                                            <button onClick={() => handleUnblock(owner._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Unblock
                                            </button>
                                        ) : (
                                            <button onClick={() => handleBlock(owner._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Block
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={owner.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default BikeOwners
