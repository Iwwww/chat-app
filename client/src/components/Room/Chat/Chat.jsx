import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList/MessageList";
import useChat from "../../../hooks/useChat";
import MessageInput from "./MessageInput/MessageInput";

function Chat() {
  const { users, messages, log, sendMessage, removeMessage } = useChat();
  const messageInputRef = useRef(null);

  useEffect(() => {
    // console.log("session storage:", sessionStorage.key);
  });

  function onChatSendClick() {
    const messageValue = messageInputRef.current.value;
    // let isValid = messageValue !== "";
    // isValid = isValid && !/^\s*$/g.test(messageValue);
    messageInputRef.current.focus();
  }

  return (
    <div className="chat-container">
      <div className="background"></div>
      <div className="scroll">
        <div className="messages-container center scroll">
          <MessageList
            log={log}
            messages={[
              { userName: "user1", messageText: "Message 1 here", userId: "1" },
              { userName: "user1", messageText: "Message 2 here", userId: "2" },
              { userName: "user1", messageText: "Message 3 here", userId: "3" },
              { userName: "user1", messageText: "Message 4 here", userId: "4" },
              { userName: "user1", messageText: "Message 5 here", userId: "5" },
              {
                userName: "user2",
                messageText: "Message from me 1 here",
                userId: "2",
              },
              { userName: "user1", messageText: "Message 6 here", userId: "6" },
            ]}
            removeMessage={removeMessage}
          />
        </div>
      </div>
      <footer className="footer">
        <MessageInput sendMessage={sendMessage} />
      </footer>
    </div>
  );
}

export default Chat;
