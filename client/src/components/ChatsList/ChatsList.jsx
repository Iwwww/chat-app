import useChat from "../../hooks/useChat";
import useChatsList from "../../hooks/useChatsList";

const ChatsList = () => {
  const { chats, fetchChats } = useChatsList();
  const { joinRoom } = useChat();

  return (
    <>
      <input type="button" onClick={fetchChats} value="Update List"></input>
      <ul>
        {chats.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="button"
                value={item.name}
                onClick={() => joinRoom(item)}
              ></input>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChatsList;
