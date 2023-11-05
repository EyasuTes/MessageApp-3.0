import React, { useEffect, useState } from "react";
import { User, PaperPlaneRight } from "phosphor-react";
import { useChatCart } from "../context/context";
import axios from "axios";
let selectedCompare;

export default function ChatBox() {
  const { selected, api, getUser, setMessages, messages, socket, contacts } =
    useChatCart();
  const [userName, setUserName] = useState("");

  // let userName;
  const [text, setText] = useState("");
  const sendMessage = async () => {
    let user = getUser();
    if (user) {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };
      const body = {
        content: text,
        chatId: selected,
      };
      await axios
        .post(api + "/api/message", body, { headers })
        .then((responce) => {
          setMessages((preValue) => [...preValue, responce.data]);
          socket.emit("message", responce.data, selected);
        });
    }
  };
  useEffect(() => {
    selectedCompare = selected;
  }, [selected]);
  useEffect(() => {
    if (selected) {
      if (selected.isGroupChat) {
        setUserName(selected.chatName);
      } else {
        let user = selected.users.find((user) => user._id !== getUser()._id);
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].phone === user.phone) {
            setUserName(contacts[i].name);
          }
        }
      }
    }
  });
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (message) => {
        if (selectedCompare) {
          console.log(message.chat._id);
          console.log(selectedCompare._id);
          if (message.chat._id === selectedCompare._id) {
            setMessages([...messages, message]);
          }
        }
      });
    }
    return () => {
      socket.off("message"); // detach the event listener when the component unmounts
    };
  });
  return (
    <div
      style={{ flex: 3 }}
      className="p-4 rounded-md bg-white flex flex-col m-2"
    >
      <div className="flex gap-2 items-center p-2 ">
        <User size={32} />
        <span>{userName}</span>
      </div>

      <div className="flex-grow flex flex-col bg-blue-100 rounded-md">
        <div className="flex-grow rounded-md"></div>
        {messages &&
          messages.map((message, index) => (
            <div
              className={`${
                getUser()._id === message.sender._id
                  ? "text-right"
                  : "text-left"
              }`}
              key={index}
            >
              {message.content}
            </div>
          ))}

        <div className="flex gap-2 p-2">
          <input
            className="bg-gray-100 flex-grow pl-4 rounded-md"
            placeholder="Enter text here..."
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-md p-2 "
          >
            <PaperPlaneRight size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
