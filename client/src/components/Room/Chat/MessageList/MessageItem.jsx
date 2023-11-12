import React from "react";
import "./MessageItem.css";

export default function MessageItem({ key, message, removeMessage }) {
  const isMyMessage = message.userName === "user2" ? true: false;

  return (
    <li key={key} className="line">
      <div className={`message-body${isMyMessage ? " me" : ""}`}>
        {isMyMessage ? null : (
          <span className="auther">{message.userName}</span>
        )}
        <p className="message-content">{message.messageText}</p>
        <span className="time-stamp">time</span>
      </div>
    </li>
  );
}
