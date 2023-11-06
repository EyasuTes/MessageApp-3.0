import React, { useEffect, useState } from "react";
import axios from "axios";
import { CaretDown } from "phosphor-react";
import { useChatCart } from "../context/context";
export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);
  const {
    api,
    user,

    setChats,

    contacts,
  } = useChatCart();
  const makeGroup = async () => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };
    await axios
      .post(
        api + "/api/chats/group",
        { members: addedMembers, name: groupName },
        { headers }
      )
      .then((responce) => {
        console.log(responce);
        setChats((prevArray) => [...prevArray, responce.data]);
      });
  };
  const AddMembers = (contact) => {
    setAddedMembers((prev) => [...prev, contact]);
  };

  return (
    <div
      className={` fixed flex flex-col items-center top-1/2 left-1/2 bg-blue-200 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2
       `}
    >
      <div
        className={`absolute bg-white top-36 w-52 ${dropDown ? "" : "hidden"}`}
      >
        {contacts &&
          contacts.map((contact) => (
            <div
              onClick={() => {
                AddMembers(contact);
              }}
              className="hover:bg-blue-100 "
              key={contact._id}
            >
              {contact.name}
            </div>
          ))}
      </div>
      <div className="text-center text-2xl">Make A Group</div>
      <div className="flex flex-col justify-center mt-12 gap-2">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <div className="flex">
          <input
            className="rounded-sm"
            placeholder="Add Members"
            type="text"
            // onChange={(e) => {
            //   SearchContact(e.target.value);
            // }}
          />
          <div
            onClick={(e) => setDropDown(!dropDown)}
            className="bg-blue-500 text-white rounded-sm"
          >
            <CaretDown size={32} />
          </div>
        </div>
      </div>
      <div className="flex-grow">
        {addedMembers &&
          addedMembers.map((members) => (
            <div key={members._id}>{members.name}</div>
          ))}
      </div>
      <div
        onClick={() => makeGroup()}
        className="text-white bg-blue-500 text-center mb-4 rounded-md p-2 "
      >
        Create
      </div>
    </div>
  );
}
