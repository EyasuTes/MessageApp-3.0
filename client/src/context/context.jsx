import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ChatContext = createContext({});

export function useChatCart() {
  return useContext(ChatContext);
}

export function ChatContextProvider({ children }) {
  const api = import.meta.env.VITE_API_KEY;

  const getUser = () => {
    let user = localStorage.getItem("userInfo");
    if (user) {
      user = JSON.parse(user);
      return user;
    } else {
      return;
    }
  };

  return (
    <ChatContext.Provider value={{ getUser }}>{children}</ChatContext.Provider>
  );
}
