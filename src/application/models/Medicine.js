import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  quantity: Number,
  unityId: String,
});

const Medicine = model("Medicine", schema);

export { Medicine };
