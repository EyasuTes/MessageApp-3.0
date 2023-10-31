import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setIsRegistered }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pics, setPics] = useState("");

  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmPassword) {
      console.log("fill all the requirements");
      return;
    }
    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/user",
        {
          name: username,
          email,
          password,
          pic: pics,
        },
        config
      );
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  const postedImage = (pic) => {
    console.log(pic);
    if (pic === undefined) {
      console.log("pic is undefined");
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "dugt5g4wp");
      fetch("https://api.cloudinary.com/v1_1/dugt5g4wp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPics(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
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
          >
            Login
          </div>
          <div
            onClick={() => {
              setIsRegistered(false);
            }}
            className={"rounded-xl bg-white bg-blue-500 w-32 text-center"}
          >
            Sign Up
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xl">
          <input
            className={`rounded-sm p-2 `}
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
          <input
            className={`rounded-sm p-2 `}
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <input
            className={`rounded-sm p-2 `}
            type="file"
            accept="image/*"
            onChange={(e) => {
              postedImage(e.target.files[0]);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 rounded-sm text-white py-1"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
