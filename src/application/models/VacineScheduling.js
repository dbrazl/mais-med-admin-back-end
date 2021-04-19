import { Schema, model } from "mongoose";

const schedule = new Schema(
  {
    label: String,
    scheduled: Boolean,
    scheduledByUser: String,
  },
  { _id: false }
);

const schema = new Schema({
  date: String,
  schedules: [schedule],
  unitId: String,
  medicineId: String,
});

const VacineScheduling = model("VacineScheduling", schema);

export { VacineScheduling };
