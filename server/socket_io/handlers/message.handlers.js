import Message from "../../models/message.model.js";
import onError from "../../utils/onError.js";

const messages = {};

export default function messageHandlers(io, socket) {
  const { roomId } = socket;

  if (!messages[roomId]) {
    messages[roomId] = [];
  }

  const updateMessageList = () => {
    io.to(roomId).emit("message_list:update", messages[roomId]);
  };

  socket.on("message:get", async () => {
    try {
      const _messages = await Message.find({
        roomId,
      });

      messages[roomId] = _messages;

      updateMessageList();
    } catch (e) {
      onError(e);
    }
  });

  socket.on("message:add", (message) => {
    console.log(`message:add: ${JSON.stringify(message)}`);
    Message.create(message).catch(onError);

    message.createdAt = Date.now();

    messages[roomId].push(message);

    console.log(
      `message added to database, messageId: ${
        JSON.stringify(messages[roomId]).pre
      }`,
    );

    updateMessageList();
  });

  socket.on("message:remove", (message) => {
    const { messageId } = message;
    Message.deleteOne({ messageId }).catch(onError);
    message[roomId] = message[roomId].filter((m) => m.messageId !== messageId);
    updateMessageList();
  });
}
