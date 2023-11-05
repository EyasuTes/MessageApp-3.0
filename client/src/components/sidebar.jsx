import React, { useEffect, useState } from "react";
import { CaretDown, DotsThree } from "phosphor-react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
import axios from "axios";
import { useChatCart } from "../context/context";
export default function Sidebar() {
  const [groupCreator, setGroupCreator] = useState(false);
  const [contactCreator, setContactCreator] = useState(false);
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  // const [searchContact, setSearchContact]= useState('')
  const {
    api,
    getUser,
    chats,
    setSelected,
    selected,
    setMessages,
    setChats,
    setContacts,
    contacts,
  } = useChatCart();

  function chatName(chat) {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    const friend = chat.users.find((user) => user._id !== getUser()._id);

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].phone === friend.phone) {
        return contacts[i].name;
      }
    }

    return friend.phone;
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

  const addChat = async () => {
    let user = getUser();
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
  const makeGroup = async () => {
    console.log(addedMembers);
    let user = getUser();
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
      });
  };
  const AddMembers = (contact) => {
    setAddedMembers((prev) => [...prev, contact]);
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
            setAddedMembers([]);
            setGroupCreator(!groupCreator);
          }}
          className="hover:bg-blue-200 hover:text-blue-500 cursor-pointer bg-blue-500 text-white p-1 flex items-center justify-center gap-2 rounded-md "
        >
          Add Group Chat <span className="text-2xl ">+</span>
        </div>
      </div>
      <div
        onClick={() => setContactCreator(!contactCreator)}
        className="hover:bg-blue-200 hover:text-blue-500 cursor-pointer bg-blue-500 text-white p-1 flex items-center justify-center gap-2 rounded-md "
      >
        Add Contact
      </div>
      <div>
        {chats &&
          chats.map((chat) => (
            <div
              className={`flex ${
                selected._id === chat._id ? " bg-blue-500 text-white" : ""
              }`}
              key={chat._id}
            >
              <div
                onClick={() => {
                  setSelected(chat);
                }}
                className="flex-grow"
              >
                {chatName(chat)}
              </div>
              <div className={`${showOptions ? "" : "hidden"}`}>
                <div>Rename</div>
                <div>Remove</div>
                <div>Remove Users</div>
              </div>
              <div
                onClick={() => {
                  setShowOptions(!showOptions);
                }}
                className="cursor-pointer"
              >
                <DotsThree size={32} />
              </div>
            </div>
          ))}
      </div>
      <div
        className={` fixed flex flex-col items-center top-1/2 left-1/2 bg-blue-200 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2 ${
          groupCreator ? "" : "hidden"
        }`}
      >
        <div
          className={`absolute bg-white top-36 w-52 ${
            dropDown ? "" : "hidden"
          }`}
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
      <div
        className={`fixed flex flex-col items-center top-1/2 left-1/2 bg-blue-200 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2 ${
          contactCreator ? "" : "hidden"
        }`}
      >
        <div className="text-center text-2xl">Create Contact</div>
        <div className="flex flex-col justify-center mt-12 gap-2">
          <input
            placeholder="Phone Number"
            className="rounded-md"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            placeholder="Contact Name"
            className="rounded-md"
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
          className="text-white bg-blue-500 text-center mb-4 rounded-md p-2 "
        >
          Create
        </div>
      </div>
    </div>
  );
}
