import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="bg-blue-300 h-screen">
      <Router>
        {/* <Navbar></Navbar> */}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chats" element={<ChatPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
