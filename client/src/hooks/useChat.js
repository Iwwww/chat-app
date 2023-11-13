import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import useAuth from "./useAuth";

export default function useChat() {
  const [room, setRoom] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [log, setLog] = useState(null);
  const { isAuth, getUser, getToken } = useAuth();
  // const { socket } = useRef(
  //   io(process.env.REACT_APP_SERVER_SOCKET, {
  //     query: {
  //       room: room,
  //       user: getUser(),
  //     },
  //     auth: {
  //       token: getToken(),
  //     },
  //   }),
  // );

  useEffect(() => {
    // socket.emit("user:add", user);
    //
    // socket.emit("user:verify", user);
    //
    // socket.emit("message:get");
    //
    // socket.on("log", (log) => {
    //   setLog(log);
    // });
    //
    // socket.on("user_list:update", (users) => {
    //   setUsers(users);
    // });
    //
    // socket.on("message_list:update", (messages) => {
    //   setMessages(messages);
    // });
  }, []);

  const sendMessage = (message) => {
    // socket.emit("message:add", message);
    // console.log(`[message:add]: ${JSON.stringify(message)}`);
  };

  const removeMessage = (message) => {
    // socket.emit("message:remove", message);
  };

  const joinRoom = (room) => {
    setRoom(room._id);
    console.log("joinRoom:", room);
  };

  return { users, messages, log, sendMessage, removeMessage, room, joinRoom };
}
