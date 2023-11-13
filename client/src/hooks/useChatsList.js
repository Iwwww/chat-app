import axios from "axios";
import { useEffect, useState } from "react";

export default function useChatsList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = () => {
    axios
      .get(process.env.REACT_APP_SERVER_API + "/room/list", { timeout: 5000 })
      .then((res) => {
        setChats(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { chats, fetchChats };
}
