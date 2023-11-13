import express from "express";
import cors from "cors";
import { createServer } from "http";
import session from "express-session";
import { Server } from "socket.io";
import onConnection from "./socket_io/onConnection.js";
import socketAuthJwt from "./socket_io/authSocketJwt.js";
import onError from "./utils/onError.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "strict",
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  }),
);
app.use((req, res, next) => {
  console.log("session:", req.session);
  next();
})
app.use(onError);

// DB
import db from "./models/index.js";
const Role = db.role;

db.mongoose
  .connect(process.env.DB, {
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
  cors: process.env.ALLOWED_ORIGIN,
  serveClient: false,
});

io.use((socket, next) => {
  socketAuthJwt(socket, next);
}).on("connection", (socket) => {
  onConnection(io, socket);
});

// routes
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";
auth(app);
user(app);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
