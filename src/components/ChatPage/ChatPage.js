import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
import { useSelector } from "react-redux";
function ChatPage() {
  const chatRoom = useSelector((state) => state.chatRoom.room);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px" }}>
        <SidePanel />
      </div>
      <div style={{ width: "100%" }}>
        <MainPanel key={chatRoom} />
      </div>
    </div>
  );
}

export default ChatPage;
