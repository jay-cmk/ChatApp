import { useState } from "react";
import UseConversation from "../zustand/UseConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = UseConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
      setMessage([...messages, res.data.newMessage]); // Update with the new message from the response
      console.log("Message sent:", res.data);
    } catch (error) {
      console.error("Error in sendMessage:", error);
    } finally {
      setLoading(false); // Ensure loading is reset even on error
    }
  };

  // Return loading and sendMessage as an object
  return { loading, sendMessage };
};

export default useSendMessage;
