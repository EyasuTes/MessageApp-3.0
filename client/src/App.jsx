import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <div className="bg-blue-100">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chats" element={<ChatPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
