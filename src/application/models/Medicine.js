import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  quantity: Number,
  Unity: String,
});

const Medicine = model("Medicine", schema);

export { Medicine };
