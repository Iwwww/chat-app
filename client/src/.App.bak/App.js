import "./App.css";
import Chat from "../Chat/Chat";
import ChatPanel from "../ChatsPanel/ChatPanel";
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <ChatPanel />
      <Chat />
    </div>
  );
}

export default App;
