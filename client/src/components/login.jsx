import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp({ setIsRegistered }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      console.log("fill all value");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);

      await localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 gap-4 flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-blue-300 p-2 rounded-md">
        <h1 className="text-center">Chat App</h1>
      </div>
      <div className="bg-blue-300 p-8 flex flex-col gap-8 rounded-md">
        <div className="flex justify-around ">
          <div
            onClick={() => {
              setIsRegistered(true);
            }}
            className={"rounded-xl bg-white bg-blue-500 w-32 text-center"}
          >
            Login
          </div>
          <div
            onClick={() => {
              setIsRegistered(false);
            }}
          >
            Sign Up
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xl">
          <input
            className="rounded-sm p-2 "
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="rounded-sm p-2 "
            type="text"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 rounded-sm text-white py-1"
        >
          LogIn
        </button>
      </div>
    </div>
  );
}
