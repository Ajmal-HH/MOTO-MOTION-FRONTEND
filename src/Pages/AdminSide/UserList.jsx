import { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Pagination from '../../Components/All/Pagination'



function UserList() {
    const token = Cookies.get('jwt-admin')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/admin')
        }
        axios.get(`/admin/users`)
            .then(response => {
                setUsers(response.data);
                //console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [navigate, token]);

    const handleBlock = async (userId) => {
        try {
            await axios.get(`/admin/blockUser?id=${userId}`);
            const updatedUser = users.map(users => {
                if (users._id === userId) {
                    return { ...users, isBlocked: true };
                }
                return users;
            });
            setUsers(updatedUser);
            toast.error('User blocked!');
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('Failed to block user');
        }
    }

    const handleUnblock = async (userId) => {
        try {
            await axios.get(`/admin/unblockUser?id=${userId}`);
            const updatedUser = users.map(users => {
                if (users._id === userId) {
                    return { ...users, isBlocked: false };
                }
                return users;
            });
            setUsers(updatedUser);
            toast.success('User unblocked!');
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
    const records = users.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div className='w-full flex'>
            <Adminsidebar />
            <div className='flex flex-col flex-1 bg-gray-200 font-googleFont'>
                <h1 className='text-center text-2xl pt-3'>Customers</h1>
                <div className='flex'>
                    <Link to={'/adduser'} className='bg-blue-500 ml-4 w-32 h-6 rounded-md text-center'>ADD NEW USER</Link>
                    <Link to={'/verify-userdocument'} className='bg-blue-500 ml-4 w-52 h-6 rounded-md text-center'>VERIFY USER DOCUMENT</Link>
                </div>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th colSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <Link to={`/user-details?userId=${user._id}`}><td className="px-6 py-4 whitespace-nowrap">{user.name}</td></Link>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/admin-loadedituser?userId=${user._id}`} className='bg-gray-500 text-white px-2 py-1 rounded'>Edit</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.isBlocked ? (
                                            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Inactive</span>
                                        ) : (
                                            user.account_status === 'verified' ? (
                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{user.account_status}</span>
                                            ) : user.account_status === 'verifying document' ? (
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{user.account_status}</span>
                                            ) : user.account_status === 'awaiting for document upload' ? (
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{user.account_status}</span>
                                            ) : null
                                        )}
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.isBlocked ? (
                                            <button onClick={() => handleUnblock(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Unblock
                                            </button>
                                        ) : (
                                            <button onClick={() => handleBlock(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                        totalItems={users.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserList;
