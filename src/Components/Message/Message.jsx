/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useAuthContext } from "../../context/AuthContext";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  // Safely handle message createdAt formatting
  let formattedTime = '';
  if (message.createdAt) {
    const date = new Date(message.createdAt); 
    if (!isNaN(date)) {
      formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      console.error('Invalid date format for message createdAt:', message.createdAt);
    }
  }

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="User avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired, // Changed from timestamp to createdAt for consistency
    shouldShake: PropTypes.bool
  }).isRequired
};

export default Message;
