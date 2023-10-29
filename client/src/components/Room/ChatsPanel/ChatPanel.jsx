import "./ChatPanel.css";
import React from "react";

function ChatPanel({ users }) {
  const chatListItem = (name) => {
    return (
      <button type="button" className="ChatListButton">
        {name}
      </button>
    );
  };

  return (
    <aside>
      <h2>Users</h2>
      <ul className="ChatList">
        {users.map(({ userId, userName }) => (
          <li key={userId} className="ChatListItem">
            {chatListItem(userName)}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ChatPanel;
