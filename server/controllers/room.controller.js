import db from "../models/index.js";
import onError from "../utils/onError.js";
const Room = db.room;
const User = db.user;

const add = async (req, res) => {
  try {
    await Room.findOne({ name: req.body.room.name })
      .then((result) => {
        if (result) {
          throw { message: "Room alrady exsists" };
        }
      })
      .catch((err) => {
        throw err;
      });

    const room = new Room(req.body.room);
    await room.save();
    return res.status(200).send({
      message: "Room added",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "An error occure while adding room",
    });
  }
};

const join = async (req, res) => {
  // TODO:
  // 1. Also make for invisible rooms
  //    and rooms with password
  try {
    await User.findOne({ _id: req.session.user._id })
      .then(async (user) => {
        await Room.findOne({ _id: req.body.room._id })
          .then(async (room) => {
            if (room) {
              await Room.updateOne(
                { name: req.body.room.name },
                { $addToSet: { users: user._id } },
              ).catch((err) => {
                throw err;
              });
            } else {
              throw { message: "Room does not exsists" };
            }
            res.status(200).send({
              message: "User join room",
              room: { id: room._id, name: room.name },
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "An error occure while join room",
    });
  }
};

const disjoin = async (req, res) => {
  await Room.findOne({ name: req.body.room.name })
    .then(async (room) => {
      if (room) {
        console.log(req.session.user._id);
        if (room.users.includes(req.session.user._id)) {
          await User.findOne({ _id: req.session.user._id })
            .then((user) => {
              console.log("user found:", user);
              room.users.push(user._id);
              room.save();
              console.log("room.users:", room.users);
              res.status(200).send({
                message: "User join room",
                room: { id: room._id, name: room.name },
              });
            })
            .catch((err) => {
              throw err;
            });
        } else {
          throw { message: "User alrady in this room" };
        }
      } else {
        throw { message: "Room does not exsists" };
      }
    })
    .catch((err) => {
      throw err;
    });
};

const list = async (req, res) => {
  await Room.find({ visible: true })
    .then((result) => {
      return res
        .status(200)
        .send({ message: "Rooms list successfully", rooms: result });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "An error occure while getting room list",
      });
    });
};

const controller = {
  add,
  join,
  list,
};

export default controller;
