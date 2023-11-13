import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  visible: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

export default model("Room", roomSchema);
