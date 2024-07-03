/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../Zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div  className={`avatar ${isOnline ? "online" : ""} bg-`}>
					<div className="w-12 rounded-full">
						<img
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							alt="user avatar"
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black'>{conversation.name}</p>
						<span>🫨</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

Conversation.propTypes = {
	conversation: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	lastIdx: PropTypes.bool.isRequired,
};

export default Conversation;

