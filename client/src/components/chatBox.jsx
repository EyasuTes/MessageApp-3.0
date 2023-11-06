import React, { useEffect, useState, useRef } from "react";
import { User, PaperPlaneRight, DotsThree, UsersThree } from "phosphor-react";
import { useChatCart } from "../context/context";
import axios from "axios";
let selectedCompare;

export default function ChatBox() {
  const {
    userImg,
    selected,
    api,
    user,
    setMessages,
    messages,
    socket,
    contacts,
  } = useChatCart();
  const [userName, setUserName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  // let userName;
  const [text, setText] = useState("");
  const sendMessage = async () => {
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
        let user1 = selected.users.find((u) => u._id !== user._id);
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].phone === user1.phone) {
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
        {selected && selected.isGroupChat ? (
          <UsersThree size={32} />
        ) : (
          <img
            style={{ objectFit: "cover" }}
            className="h-12 w-12 rounded-full"
            src={userImg(selected)}
            alt=""
          />
        )}

        <span className="flex-grow">{userName}</span>
        <div
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          className="cursor-pointer"
        >
          <DotsThree size={32} />
        </div>
        <div
          className={`${
            showOptions ? "h-12" : "opacity-0 h-0"
          } absolute right-6 top-32 bg-white transition-all duration-500 rounded-md `}
        >
          <div className="hover:bg-blue-100">Remove User</div>
          <div className="hover:bg-blue-100">Rename Group</div>
        </div>
      </div>

      <div className="flex-grow flex   flex-col bg-blue-100 rounded-md">
        <div className="flex-grow rounded-md"></div>
        <div className="flex flex-col gap-2">
          {messages &&
            messages.map((message, index) => (
              <div
                className={`px-2 ${
                  user._id === message.sender._id ? "text-right  " : "text-left"
                }`}
              >
                <div
                  style={{}}
                  className={`inline-block ${
                    user._id === message.sender._id
                      ? "bg-blue-500  text-white p-2 rounded-md "
                      : "bg-white p-2 rounded-md"
                  }`}
                  key={index}
                >
                  {message.content}
                </div>
              </div>
            ))}
        </div>

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
