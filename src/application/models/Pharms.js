import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  latitude: Number,
  longitude: Number,
});

const medicineSchema = new Schema({
  name: String,
  quantity: Number,
  needToSchedule: Bollean,
});

const schema = new Schema({
  name: String,
  distance: Number,
  neighborhood: String,
  location: locationSchema,
  medicines: [medicineSchema],
});

const Pharms = model("Pharms", schema);

export { Pharms };
