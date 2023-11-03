import React from "react";
import { useChatCart } from "../context/context";
export default function Sidebar({ chats }) {
  const { getUser } = useChatCart();
  function chatName(chat) {
    const friend = chat.users.filter((user) => user._id !== getUser()._id);
    console.log(friend[0].name);
    return friend[0].name;
  }
  return (
    <div
      style={{ flex: 2 }}
      className="flex flex-col rounded-md m-2 bg-white flex-1"
    >
      <div className="flex items-center justify-between p-2">
        <div className="text-2xl font-bold ">Chats</div>
        <div className="hover:bg-blue-200 hover:text-blue-500 cursor-pointer bg-blue-500 text-white p-1 flex items-center justify-center gap-2 rounded-md ">
          Add Group Chat <span className="text-2xl ">+</span>
        </div>
      </div>
      <div>
        {chats &&
          chats.map((chat) => (
            <div key={chat._id}>
              {chatName(chat)}
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
}
