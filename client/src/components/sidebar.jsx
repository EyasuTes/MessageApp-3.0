import React, { useEffect, useState } from "react";
import { Plus } from "phosphor-react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
import axios from "axios";
import { useChatCart } from "../context/context";
export default function Sidebar() {
  const [groupCreator, setGroupCreator] = useState(false);
  // const [searchContact, setSearchContact]= useState('')
  const { api, getUser, chats, setSelected, selected, setMessages } =
    useChatCart();
  function chatName(chat) {
    const friend = chat.users.filter((user) => user._id !== getUser()._id);

    return friend[0];
  }
  async function getMessages() {
    let user = getUser();
    if (user) {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };

      await axios
        .get(api + `/api/message/${selected._id}`, { headers })
        .then((responce) => {
          setMessages(responce.data);
        });
    }
  }
  useEffect(() => {
    if (selected) {
      getMessages();
    }
  }, [selected]);
  const SearchContact = (e) => {
    console.log(chats);
    // const users = chats.filter(chat=>{
    //   chat.filter(cha=>)
    // })
  };
  return (
    <div
      style={{ flex: 2 }}
      className="flex flex-col rounded-md m-2 bg-white flex-1"
    >
      <div className="flex items-center justify-between p-2">
        <div className="text-2xl font-bold ">Chats</div>
        <div
          onClick={() => {
            setGroupCreator(!groupCreator);
          }}
          className="hover:bg-blue-200 hover:text-blue-500 cursor-pointer bg-blue-500 text-white p-1 flex items-center justify-center gap-2 rounded-md "
        >
          Add Group Chat <span className="text-2xl ">+</span>
        </div>
      </div>
      <div>
        {chats &&
          chats.map((chat) => (
            <div
              className={`${
                selected._id === chat._id ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                setSelected(chat);
              }}
              key={chat._id}
            >
              {chatName(chat).name}
              <div></div>
            </div>
          ))}
      </div>
      <div className="fixed flex flex-col items-center top-1/2 left-1/2 bg-blue-200 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center text-2xl">Make A Group</div>
        <div className="flex justify-center mt-12 gap-2">
          <input
            className="rounded-md"
            type="text"
            onChange={(e) => {
              SearchContact(e.target.value);
            }}
          />
          <div className="bg-blue-500 text-white rounded-sm">
            <Plus size={32} />
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="text-white bg-blue-500 text-center mb-4 rounded-md p-2 ">
          Create
        </div>
      </div>
    </div>
  );
}
