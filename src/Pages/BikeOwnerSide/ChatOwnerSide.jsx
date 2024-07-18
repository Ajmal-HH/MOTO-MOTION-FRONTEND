/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { TiMessage } from "react-icons/ti"
import axios from '../../utils/axiosConfig'
import { Link } from "react-router-dom"
import { io } from "socket.io-client";



const ChatOwnerSide = () => {
    console.log("I Am  chat");
    const [allUsers, setallUsers] = useState([]); // to list users in the sidebar
    const [selectedUser, setSelectedUser] = useState(null); // to show name on the message heading
    const [messages, setMessages] = useState(""); // to show name on the message heading
    const [messageData, setMessageData] = useState([]); // Initialize as an empty string
    const [socket, setSocket] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [search, setSearch] = useState("");
    const [senderId, setSenderId] = useState()
    const [receiverId, setReceiverId] = useState()
    const [curentUsers, setCurentUsers] = useState()

    console.log(senderId,"senderId");
    console.log(receiverId,"receiverId");

    const token = localStorage.getItem('ownerToken'); 
    const bikeOwnerData = localStorage.getItem('bikeOwnerData'); 




    useEffect(() => {
        const newSocket = io("https://muhamedajmal.live");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("addUser", senderId);
            socket.on("getUsers", (users) => {
                setCurentUsers(users);
            });

            socket.on("getMessage", ({ senderId, message, receiverId }) => {
                const message1 = {
                    createdAt: Date.now(),
                    message: message,
                    receiverId: receiverId,
                    senderId: senderId,
                };
                setMessageData((prevMessages) => [...prevMessages, message1]);
            });
        }
    }, [socket, senderId]);

    useEffect(() => {
        if (senderId && receiverId) {
            axios.get(`/messages/fetchchats/?id=${receiverId}&myId=${senderId}`)
                .then((response) => {
                    if (response) {
                        setMessageData(response.data?.messageData);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [receiverId, senderId]);

    useEffect(() => {
        axios.get(`/admin/users`)
            .then((response) => {
                if (response.data) {
                    setallUsers(response.data);
                }
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    }, []);

    const handleUserClick = (user) => {
        setReceiverId(user._id);
    };

    useEffect(() => {
        if (receiverId) {
            axios.post(`/messages/receiverdata/${receiverId}`,{bikeOwnerData})
                .then((response) => {
                    setSelectedUser(response.data.receiverData);
                    setSenderId(response.data.senderId);
                })
                .catch((error) => {
                    console.error("Error fetching receiver data or chats:", error);
                });
        }
    }, [receiverId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!messages || !selectedUser?._id) return;
        const newMessage = { message: messages, senderId: senderId, receiverId: selectedUser._id, createdAt: Date.now() };
        setMessageData((prevMessages) => [...prevMessages, newMessage]);

        socket.emit("sendMessage", {
            senderId: senderId,
            receiverId: selectedUser._id,
            message: messages,
        });

        axios.post(`/messages/send`, {
            userId: selectedUser?._id,
            senderId: senderId,
            message: messages,
        })
        .then((response) => {
            if (response) {
                setMessages("");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSearch = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(inputValue)) {
            setSearchError("The provided value to search should be in Alphabetic");
            setSearch("");
        } else {
            setSearchError("");
            setSearch(inputValue);
        }
    };

    return (
        <>


            <div className="flex h-screen overflow-hidden bg-blue-gray-500">
                {/* SIDE BAR */}
                <div className="w-1/4 border-r border-gray-300 b bg-cyan-950">
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-teal-500 text-white">
                        <div className="max-w-2xl mx-auto">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>

                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-950 focus:border-cyan-950 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-cyan-950"
                                        placeholder="Search"
                                        required
                                        onChange={(e) => handleSearch(e)}
                                        value={search}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="p-2.5 ml-2 text-sm font-medium text-white bg-cyan-950 rounded-lg border border-cyan-950 hover:bg-cyan-950 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-950 dark:hover:bg-cyan-950 dark:focus:ring-cyan-950"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>

                                </button>
                            </form>
                        </div>
                        <div className="relative">
                            <div
                                id="menuDropdown"
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
                            >
                                <ul className="py-2 px-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                                        >
                                            Option 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                                        >
                                            Option 2
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>

                    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                        {allUsers?.map((user) => {
                            return (
                                <div
                                    key={user?._id}
                                    onClick={() => handleUserClick(user)}
                                    className="flex items-center mb-4 cursor-pointer hover:bg-cyan-700 p-2 rounded-md"
                                >
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                                            alt="User Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-l text-white font-semibold">
                                            {user?.name}
                                        </h2>
                                        <p className="text-white">How are you!!</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* ==================MESSAGE CONTAINER================================= */}

                <div className="flex-1 bg-white overflow-y-auto mb-20 ">
                    {selectedUser ? (
                        <header className="bg-cyan-950 fixed w-full p-4 text-white">
                            <div className=" ">
                                <h1 className="text-2xl font-semibold">
                                    {selectedUser?.name}
                                </h1>
                            </div>
                            <div className="w-9/12 flex  items-center justify-end gap-4 ">

                                <Link to="/bikeowner-dashboard">
                                    <button className="button-class">Back</button>
                                </Link>
                            </div>
                            <div className="flex-grow">
                                {" "}
                                {/* This div takes up the rest of the space */}
                            </div>
                        </header>
                    ) : (
                        <div className='flex items-center justify-center w-full h-full'>
                            <div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
                                <p>Welcome 👋 ❄</p>
                                <p>Select a chat to start messaging</p>
                                <TiMessage className='text-3xl md:text-6xl text-center' />
                            </div>
                        </div>
                    )}

                    {/* StudentSide */}

                    <div className="w-full h-full mt-18 pt-10 p-4">
                        {messageData?.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 mb-4 cursor-pointer overflow-y-auto ${item.senderId === senderId ? 'items-end' : 'items-start'
                                    }`}
                            >
                                <div className={`flex ${item.senderId === senderId ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                        <img
                                            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    <div className={`flex max-w-xs flex-col rounded-lg p-3 gap-3 ${item.senderId === senderId ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-gray-500 '
                                        }`}>
                                        <p className={`text-sm ${item.senderId === senderId ? 'text-black' : 'text-white'
                                            }`}>{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message posting Section */}

                    <footer className="bg-teal-500 border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                        {selectedUser && (
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={messages}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setMessages(e.target.value);
                                        }}
                                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-teal-950 text-white px-4 py-2 rounded-md ml-2"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        )}
                    </footer>
                </div>
                {/* MESSAGE CONTAINER ENDS HERE */}
            </div>
        </>
    )
}

export default ChatOwnerSide
