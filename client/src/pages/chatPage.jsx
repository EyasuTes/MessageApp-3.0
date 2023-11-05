import React, { useState, useEffect } from "react";
import ChatBox from "../components/chatBox";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatCart } from "../context/context";

export default function ChatPage() {
  const { getUser, setChats, setContacts } = useChatCart();
  const navigate = useNavigate();

  const fetchChats = async () => {
    const api = import.meta.env.VITE_API_KEY;
    let user = getUser();
    if (user) {
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
      await axios.get(api + "/api/contact", { headers }).then((responce) => {
        if (responce.status === 200) {
          console.log(responce.data);
          setContacts(responce.data);
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
      <Sidebar></Sidebar>
      <ChatBox></ChatBox>
    </div>
  );
}
