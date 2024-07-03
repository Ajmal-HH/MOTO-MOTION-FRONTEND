import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import { toast } from "react-toastify";
import axios from "../utils/axiosConfig";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/messages/messages/${selectedConversation._id}`);
        setMessages(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
