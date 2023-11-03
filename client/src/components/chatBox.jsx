import React, { useState } from "react";
import { User, PaperPlaneRight } from "phosphor-react";

export default function ChatBox() {
  const convo = ["hello", "hi how are you", "i am good", "good"];
  const [text, setText] = useState("");
  return (
    <div
      style={{ flex: 3 }}
      className="p-4 rounded-md bg-white flex flex-col m-2"
    >
      <div className="flex gap-2 items-center p-2 ">
        <User size={32} />
        <span>David</span>
      </div>

      <div className="flex-grow flex flex-col bg-blue-100 rounded-md">
        <div className="flex-grow rounded-md"></div>
        {convo &&
          convo.map((con, index) => (
            <div className="text-right" key={index}>
              {con}
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
          <div className="bg-blue-500 text-white rounded-md p-2 ">
            <PaperPlaneRight size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
