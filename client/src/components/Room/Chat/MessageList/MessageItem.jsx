import React from "react";
import { USER_KEY } from "../../../../constants";
import storage from "../../../../utils/storage";
import "./MessageItem.css";

export default function MessageItem({ key, message, removeMessage }) {
  const user = storage.get(USER_KEY);
  const isMyMessage = user.userId === message.userId;

  return (
    <li key={key} className="line">
      <div className={`message-body${isMyMessage ? " me" : ""}`}>
        {isMyMessage ? null : (
          <span className="auther">{message.userName}</span>
        )}
        <p className="content">{message.messageText}</p>
        <span className="time-stamp">time</span>
      </div>
    </li>
  );
}
