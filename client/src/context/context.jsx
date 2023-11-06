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
  const [groupCreator, setGroupCreator] = useState(false);
  const [contactCreator, setContactCreator] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    let user1 = localStorage.getItem("userInfo");
    if (user1) {
      user1 = JSON.parse(user1);
      setUser(user1);
    }
  }, []);
  useEffect(() => {
    if (selected) {
      const room = selected._id;
      socket.emit("join_Room", room);
    }
  }, [selected]);
  const userImg = (chat) => {
    console.log(chat);
    if (chat) {
      const friend = chat.users.find((u) => u._id !== user._id);
      console.log(friend);
      return friend.pic;
    }
    return;
  };
  return (
    <ChatContext.Provider
      value={{
        groupCreator,
        setGroupCreator,
        contactCreator,
        setContactCreator,
        userImg,
        contacts,
        setContacts,
        socket,
        setMessages,
        messages,
        selected,
        setSelected,
        chats,
        setChats,
        user,
        api,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
