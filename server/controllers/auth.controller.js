import db from "../models/index.js";
const User = db.user;
const Role = db.role;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const requireAuth = async (req, res, next) => {
  const { user } = req.session;
  // console.log("user:", JSON.stringify(req.session.user));
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

const signup = async (req, res) => {
  const user = new User({
    username: req.body?.username,
    email: req.body?.email,
    password: bcrypt.hashSync(req.body?.password, 8),
  });

  try {
    if (req.body.roles) {
      await Role.find({ name: { $in: req.body.roles } })
        .then((roles) => {
          const userRoles = [];
          roles.map((role) => {
            userRoles.push(role._id);
          });
          user.roles = userRoles;
        })
        .catch((err) => {
          throw err;
        });
    } else {
      await Role.findOne({ name: "user" })
        .then((role) => {
          user.roles = [role._id];
        })
        .catch((err) => {
          throw err;
        });
    }

    await user.save();

    res.send({ message: "User was registered successfully!" });
    console.error(`User: "${req.body.username}" was registered successfully!`);
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while registering the user.",
    });
    console.error(`Can not register user: "${req.body.username}"`);
  }
};

const signin = async (req, res) => {
  await User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .then((user) => {
      if (!user) {
        throw {
          status: 404,
          message: "User Not found.",
        };
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        throw {
          status: 401,
          message: "Invalid Password!",
        };
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;
      req.session.user = user;
      // console.log("signin, user:", user);

      res.status(200).send({
        message: "Aunthentification success!",
        user: {
          id: user._id,
          username: user.username,
          roles: user.roles,
        },
        token: token,
      });
    })
    .catch((err) => {
      res.status(err.status || 400).send({
        message: err.message || "An error occurred while sign in.",
      });
    });
};

const signout = async (req, res) => {
  try {
    req.session.destroy(null);
    return res.status(200).send({ message: "You have been signed out!" });
  } catch (err) {
    // console.log("error signout:", err);
    // next(err);
  }
};

const data = async (req, res) => {
  try {
    await User.findOne({
      username: req.session.user.username,
    }).then((user) => {
      return res.status(200).send({
        user: {
          id: user._id,
          username: user.username,
          roles: user.roles,
        },
        token: req.session.token,
      });
    });
  } catch (err) {
    res.status(err.status || 400).send({
      message: err.message || "An error occurred while get info.",
    });
  }
};

const controller = {
  requireAuth,
  signup,
  signin,
  signout,
  data,
};

export default controller;
