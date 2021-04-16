import { Schema, model } from "mongoose";

const schedule = new Schema({
  label: String,
  scheduled: Boolean,
  scheduledByUser: String,
});

const schema = new Schema({
  date: String,
  schedules: [schedule],
});

const Scheduling = model("Scheduling", schema);

export { Scheduling };