import {  useState } from "react";
import useConversation from "../Zustand/useConversation";
import { toast } from "react-toastify";
import axios from '../utils/axiosConfig';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  console.log(selectedConversation?._id,"selectedConversationnnnn");
  const sendMessage = async (message) => {

    setLoading(true);
    try {
      const response = await axios.post(`/messages/send/${selectedConversation._id}`, { message });
      setMessages([...messages, response.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);


    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
