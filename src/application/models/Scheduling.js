import { Schema, model } from "mongoose";

const schema = new Schema({
  date: String,
  schedules: [String],
});

const Scheduling = model("Scheduling", schema);

export { Scheduling };
