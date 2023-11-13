import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import user from "./user.model.js";
import role from "./role.model.js";
import room from "./room.model.js";
db.user = user;
db.role = role;
db.room = room;

db.ROLES = ["user", "admin", "moderator"];

export default db;
