import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ mesage: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decode.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const { user } = req.session;
  await User.findById(user._id)
    .then(async (user) => {
      await Role.find({ _id: { $in: user.roles } }).then((roles) => {
        if (!roles.some((role) => role.name === "admin")) {
          throw {
            message: "Require Admin Role!",
            status: 403,
          };
        }
        next();
      });
    })
    .catch((err) => {
      res.status(err.status || 500).send({
        message: err.message || "An error occurred while verifying the user.",
      });
    });
};

const isModerator = async (req, res, next) => {
  await User.findById(req.userId)
    .then(async (user) => {
      await Role.find({ _id: { $in: user.roles } }).then((roles) => {
        if (!roles.some((role) => role.name === "moderator")) {
          throw {
            message: "Require Moderator Role!",
            status: 403,
          };
        }
        next();
      });
    })
    .catch((err) => {
      res.status(err.status || 500).send({
        message: err.message || "An error occurred while verifying the user.",
      });
    });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

export default authJwt;
