import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChatCart } from "../context/context";
export default function CreateContact() {
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const {
    api,
    user,

    contactCreator,
    setContactCreator,
    setChats,
    setContacts,
  } = useChatCart();
  const addChat = async () => {
    const body = {
      phone: phone,
    };
    if (user) {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };
      await axios
        .post(api + `/api/chats`, body, { headers })
        .then((responce) => {
          console.log(responce);
          setChats((prevArray) => [...prevArray, responce.data]);
        });
      await axios
        .post(
          api + `/api/contact`,
          { phone: phone, contactName: contactName },
          { headers }
        )
        .then((responce) => {
          setContacts((prevArray) => [...prevArray, responce.data]);
        });
    }
  };
  return (
    <div>
      <div
        className={`fixed shadow-xl  flex rounded-md flex-col gap-4 p-2 top-1/2 left-1/2 bg-blue-200  transform -translate-x-1/2 -translate-y-1/2 
          
        `}
      >
        <div className="flex justify-between ">
          <div className="text-center text-2xl ">Create Contact</div>
          <div className="text-right w-2 h-2">
            <div
              onClick={() => setContactCreator(!contactCreator)}
              className=" cursor-pointer hover:text-red-500 bg-blue-100 p-1 inline-block  text-sm rounded-full "
            >
              X
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center  gap-2">
          <input
            placeholder="Phone Number"
            className="rounded-md text-2xl"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            placeholder="Contact Name"
            className="rounded-md text-2xl"
            type="text"
            value={contactName}
            onChange={(e) => {
              setContactName(e.target.value);
            }}
          />
        </div>
        <div className="flex-grow"></div>
        <div
          onClick={() => addChat()}
          className="text-white text-xl bg-blue-500 text-center mb-4 rounded-md p-2 "
        >
          Create
        </div>
      </div>
    </div>
  );
}
