import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";

import LoginPage from "./components/LoginPage/LoginPage";

import RegisterPage from "./components/RegisterPage/RegisterPage";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        navigate("/");
        // ...
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
