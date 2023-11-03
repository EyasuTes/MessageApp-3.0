import React, { useState, useEffect } from "react";
import ChatBox from "../components/chatBox";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatCart } from "../context/context";

export default function ChatPage() {
  const { getUser } = useChatCart();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const api = import.meta.env.VITE_API_KEY;
    let user = getUser();
    if (user) {
      console.log(user);

      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      };

      await axios.get(api + "/api/chats", { headers }).then((responce) => {
        if (responce.status === 200) {
          setChats(responce.data);
        } else {
          localStorage.removeItem("userInfo");
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div style={{ height: "93vh" }} className="flex w-full ">
      <Sidebar chats={chats}></Sidebar>
      <ChatBox></ChatBox>
    </div>
  );
}
