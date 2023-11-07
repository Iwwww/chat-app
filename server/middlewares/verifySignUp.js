import db from "../models/index.js";
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    const usernameUser = await User.findOne({
      username: req.body.username,
    }).exec();

    if (usernameUser) {
      res.status(400).send({ message: "Failed! Username is alrady in use!" });
      return;
    }

    // Email
    const emailUser = await User.findOne({ email: req.body.email }).exec();

    if (emailUser) {
      res.status(400).send({ message: "Failed! Email is alrady in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while checking duplicate username or email.",
    });
  }
};

const checkRolesExisted = (req, res, next) => {
  try {
    if (!req.body.roles) {
      throw {
        message: "No roles provided!",
      };
    }
    if (Array.isArray(req.body.roles)) {
      if (req.body.roles.length === 0) {
        throw {
          message: "No roles provided!",
        };
      }
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          throw {
            message: `Failed! Role ${req.body.roles[i]} does not exist!`,
          };
        }
      }
    } else {
      throw {
        message: "Invalid data type for roles. Expected an array.",
      };
    }

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message || "Some error occurred while checking roles.",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
