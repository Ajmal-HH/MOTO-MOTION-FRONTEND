/* eslint-disable react-hooks/exhaustive-deps */



import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/UserSide/Header";
import { useEffect, useState, useRef } from "react";
import axios from '../../utils/axiosConfig';
import { io } from "socket.io-client";

function Chat() { 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const receiverId = searchParams.get("recieverId");
    const senderId = searchParams.get("senderId");
    const [conversation, setConversation] = useState({});
    const [messageData, setMessageData] = useState([]); // Initialize as an empty string
    const [socket, setSocket] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [currentUsers, setCurrentUsers] = useState(null);
    const [messages, setMessages] = useState("");
    const messagesEndRef = useRef(null);


    useEffect(() => {
        axios.get(`/messages/getreceiverdata`, {
            params: { receiverId }
        })
        .then((response) => {
            setConversation(response.data);
        })
        .catch((error) => {
            console.error('Error fetching receiver data:', error);
        });
    }, [receiverId]);

    useEffect(() => {
    //   const newSocket = io("https://muhamedajmal.live");
      const newSocket = io("https://moto-motion-backend.vercel.app/");
      setSocket(newSocket);

      return () => {
          newSocket.disconnect();
      };
  }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("addUser", senderId);
            socket.on("getUsers", (users) => {
                setCurrentUsers(users);
            });

            socket.on("getMessage", ({ senderId, message, receiverId }) => {
              
              const message1 = {
                    createdAt: Date.now(),
                    message: message,
                    receiverId: receiverId,
                    senderId: senderId,
                };

                axios.get(`/messages/fetchchats/?id=${receiverId}&myId=${senderId}`)
                .then((response) => {
                    if (response) {
                        setMessageData((prevMessages) => [...prevMessages, message1]);
                    }
                });
            });
        }
    }, [socket]);

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
    }, [senderId, receiverId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageData]);

    const sendMessage = () => {
        if (!messages || !receiverId) return;
        setMessageData((prevMessages) => [...prevMessages, { message: messages }]);
        socket.emit("sendMessage", {
            senderId: senderId,
            receiverId: receiverId,
            message: messages,
        });

        axios.post(`/messages/send`, {
            userId: receiverId,
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <Header />
            <>
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute text-green-500 right-0 bottom-0">
                                    <svg width={20} height={20}>
                                        <circle cx={8} cy={8} r={8} fill="currentColor" />
                                    </svg>
                                </span>
                                <img
                                    src={conversation?.photo}
                                    alt=""
                                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                                />
                            </div>
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3">
                                    {conversation?.bikeowner_name}
                                </span>
                            </div>
                            <div className="flex flex-col leading-tight" style={{ height: "100%" }}>
                                <div className="flex justify-end mb-2">
                                    <Link
                                        to="/user-bookinglist"
                                        className="bg-teal-500 hover:from-pink-500 hover:to-yellow-500 ... rounded-md px-4 py-2 text-white text-sm font-medium"
                                    >
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2"></div>
                    </div>
                    <div
                        id="messages"
                        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                    >
                        {messageData?.map((message, index) => (
                            <div key={index} className="chat-message">
                                <div
                                    className={`flex items-end ${
                                        message.senderId === receiverId
                                            ? "justify-start"
                                            : "justify-end"
                                    }`}
                                >
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2">
                                        <div>
                                            <span
                                                className={`px-4 py-2 rounded-lg inline-block ${
                                                    message.senderId === receiverId
                                                        ? "rounded-bl-none bg-gray-300 text-gray-600"
                                                        : "rounded-br-none bg-blue-600 text-white"
                                                }`}
                                            >
                                                {message.message}
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src={
                                            message.senderId === receiverId
                                                ? 'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144'
                                                : "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                                        }
                                        alt={
                                            message.senderId === receiverId
                                                ? "Receiver"
                                                : "Sender"
                                        }
                                        className="w-6 h-6 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <form className="relative flex" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                                value={messages}
                                onChange={(e) => setMessages(e.target.value)}
                            />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button
                                    onClick={sendMessage}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                >
                                    <span className="font-bold">Send</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-6 w-6 ml-2 transform rotate-90"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n",
                    }}
                />
            </>
        </div>
    );
}

export default Chat;

