import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatContext = createContext({});

export function useChatCart() {
  return useContext(ChatContext);
}

export function ChatContextProvider({ children }) {
  const api = import.meta.env.VITE_API_KEY;
  const [chats, setChats] = useState();
  const [selected, setSelected] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const getUser = () => {
    let user = localStorage.getItem("userInfo");
    if (user) {
      user = JSON.parse(user);
      return user;
    } else {
      return;
    }
  };
  useEffect(() => {
    if (selected) {
      const room = selected._id;
      socket.emit("join_Room", room);
    }
  }, [selected]);
  return (
    <ChatContext.Provider
      value={{
        contacts,
        setContacts,
        socket,
        setMessages,
        messages,
        selected,
        setSelected,
        chats,
        setChats,
        getUser,
        api,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
