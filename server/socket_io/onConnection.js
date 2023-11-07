import userHandlers from "./handlers/user.handlers.js";
import messageHandlers from "./handlers/message.handlers.js";
import auth from "./authSocketJwt.js";

export default function onConnection(io, socket) {
  auth(io, socket);
  const { roomId, userName } = socket.handshake.query;

  socket.roomId = roomId;
  socket.userName = userName;

  socket.join(roomId);
  console.log(`User ${userName} connected to room ${roomId}`);

  userHandlers(io, socket);

  messageHandlers(io, socket);
}
