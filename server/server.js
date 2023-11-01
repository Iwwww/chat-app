import express from "express";
import cors from "cors";
import { createServer } from "http";
import cookieSession from "cookie-session";
import { Server } from "socket.io";
import "./config/db.config.js";
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
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "chat-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  }),
);
app.use(onError);

import db from "./models/index.js";
import dbConfig from "./config/db.config.js";
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
    initial();
  })
  .catch((err) => {
    console.error("DB connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        new Role({
          name: "user",
        })
          .save()
          .then(() => {
            console.log("added 'user' to roles collections");
          })
          .catch((err) => {
            console.log("error", err);
          });

        new Role({
          name: "moderator",
        })
          .save()
          .then(() => {
            console.log("added 'moderator' to roles collections");
          })
          .catch((err) => {
            console.log("error", err);
          });

        new Role({
          name: "admin",
        })
          .save()
          .then(() => {
            console.log("added 'admin' to roles collections");
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    })
    .catch((err) => {
      console.log("Error getting role count:", err);
    });
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
