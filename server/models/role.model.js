import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model("Role", roleSchema);
