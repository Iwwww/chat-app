import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { USER_KEY } from "../../constants";
import storage from "../../utils/storage";
import styles from "./InputName.module.css"

export const InputName = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("main_room");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const isValid = isValidName(userName);
    setSubmitDisabled(!isValid);
  }, [userName]);

  const isValidName = (name) => {
    const isFieldEmpty = Object.values(name).some((v) => !v.trim());
    if (isFieldEmpty) {
      return false;
    }
    if (name === "") {
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (submitDisabled) return;

    const userId = nanoid();

    storage.set(USER_KEY, {
      userId,
      userName: userName,
      roomId: roomId,
    });

    window.location.reload();
  };

  return (
    <form onSubmit={(event) => onSubmit(event)} className="form login" style={styles}>
      <p className="name label">Name:</p>
      <input
        className="input-name"
        type="text"
        onChange={(event) => setUserName(event.target.value)}
        onKeyDown={(event) => {
          event.key === "Enter" && onSubmit(event);
        }}
        style={styles}
      ></input>
      <input
        className="input-submit"
        type="submit"
        value="Submit"
        onClick={(event) => onSubmit(event)}
        disabled={submitDisabled}
      ></input>
    </form>
  );
};
