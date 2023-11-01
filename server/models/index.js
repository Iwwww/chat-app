import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import user from "./user.model.js"
import role from "./role.model.js"
db.user = user;
db.role = role;
// db.user = require("./user.model");
// db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

export default db;
