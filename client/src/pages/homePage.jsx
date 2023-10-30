import React from "react";
import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login_signup, setLogin_Signup] = useState("signup");
  return (
    <div className="p-4 gap-4 flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-blue-300 p-2 rounded-md">
        <h1 className="text-center">Chat App</h1>
      </div>
      <div className="bg-blue-300 p-8 flex flex-col gap-8 rounded-md">
        <div className="flex justify-around ">
          <div
            onClick={() => {
              setLogin_Signup("login");
            }}
            className={`text-white" ${
              login_signup === "login"
                ? "rounded-xl bg-white bg-blue-500 w-32 text-center"
                : ""
            }`}
          >
            Login
          </div>
          <div
            onClick={() => {
              setLogin_Signup("signup");
            }}
            className={`text-white" ${
              login_signup === "signup"
                ? "rounded-xl bg-white bg-blue-500 w-32 text-center"
                : ""
            }`}
          >
            Sign Up
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xl">
          <input
            className={`rounded-sm p-2 ${
              login_signup === "login" ? "hidden" : ""
            }`}
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
            className={`rounded-sm p-2 ${
              login_signup === "login" ? "hidden" : ""
            }`}
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button className="bg-blue-500 rounded-sm text-white py-1">
          {login_signup === "login" ? <div>Login</div> : <div>Sign Up</div>}
        </button>
      </div>
    </div>
  );
}
