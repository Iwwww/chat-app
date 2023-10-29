import React, { useState, forwardRef, useEffect } from "react";
import "./Message.css";

const Message = forwardRef(function Message(props, ref) {
  const { username, message, you } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [timestamp, setTimestamp] = useState(getTimeStamp());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function getTimeStamp() {
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes().toString()
        : new Date().getMinutes().toString();
    return `${hours}:${minutes}`;
  }

  function setClassName(className) {
    if (you) {
      return className + " You";
    }
    return className;
  }

  const containerContent = () => {
    if (you) {
      return (
      <div className={setClassName("MessageContent")}>{message}</div>
      )
    }
    return (
      <div className={setClassName("MessageContent")}>
        <div className="AutherName">{username}</div>{message}
      </div>
    );
  };

  const timeStamp = () => {
    return <span className="TimeStamp">{timestamp}</span>;
  };

  return (
    <div className={`Line${isVisible ? " animate" : ""}`} ref={ref}>
      <div className={setClassName("Container")}>
        {containerContent()}
        {timeStamp()}
      </div>
    </div>
  );
});

export default Message;
