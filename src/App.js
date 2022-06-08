import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";

import LoginPage from "./components/LoginPage/LoginPage";

import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
