import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  date: String,
  schedule: String,
});

const Vacine = model("Vacine", schema);

export { Vacine };
