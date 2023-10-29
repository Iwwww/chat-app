import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageScheme = new Schema(
  {
    messageId: {
      type: String,
      require: true,
      unique: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Message", messageScheme);
