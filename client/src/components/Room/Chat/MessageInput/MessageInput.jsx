import React, { useState, useEffect, useRef } from "react";
import { USER_KEY } from "../../../../constants";
import storage from "../../../../utils/storage";
import { nanoid } from "nanoid";
import "./MessageInput.css";

export default function MessageInput({ sendMessage }) {
  const user = storage.get(USER_KEY);
  const [text, setText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    setSubmitDisabled(!text.trim());
  }, [text]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitDisabled) return;

    const { userId, userName, roomId } = user;
    const message = {
      messageId: nanoid(),
      messageText: text,
      userId,
      userName,
      roomId,
    };

    sendMessage(message);

    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="form message">
      <input
        type="text"
        autoFocus
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      ></input>
      {/* <button className="button" type="submit" disabled={submitDisabled}> */}
      {/*   Send */}
      {/* </button> */}
    </form>
  );
}
