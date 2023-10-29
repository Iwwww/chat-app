import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { MONGODB_URI } from "./config/db.config.js";
import { ALLOWED_ORIGIN } from "./config/cors.config.js";
import onConnection from "./socket_io/onConnection.js";
import onError from "./utils/onError.js";

const app = express();
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  }),
);

app.use(express.json());
app.use(onError);

try {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
} catch (e) {
  onError(e);
}

const server = createServer(app);

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false,
});

io.on("connection", (socket) => {
  onConnection(io, socket);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
