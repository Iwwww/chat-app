import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import MessageList from "./MessageList/MessageList";
import useChat from "../../../hooks/useChat";
import MessageInput from "./MessageInput/MessageInput";

function Chat() {
  const { users, messages, log, sendMessage, removeMessage } = useChat();
  const messageInputRef = useRef(null);

  useEffect(() => {
    console.log("session storage:", sessionStorage.key);
  });

  function onChatSendClick() {
    const messageValue = messageInputRef.current.value;
    // let isValid = messageValue !== "";
    // isValid = isValid && !/^\s*$/g.test(messageValue);
    messageInputRef.current.focus();
  }

  return (
    <div className="chat">
      <div className="background"></div>
      <div className="messages-container center scroll">
        <MessageList
          log={log}
          messages={messages}
          removeMessage={removeMessage}
        />
      </div>
      <footer className="footer">
        <MessageInput sendMessage={sendMessage} />
      </footer>
    </div>
  );
}

export default Chat;
