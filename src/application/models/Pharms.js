import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { encodeConfig } from "../../infraesctruture/config/encode";

const locationSchema = new Schema(
  {
    latitude: Number,
    longitude: Number,
  },
  { _id: false }
);

const medicineSchema = new Schema(
  {
    name: String,
    quantity: Number,
    needToSchedule: Boolean,
  },
  { _id: false }
);

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  neighborhood: String,
  location: locationSchema,
  medicines: [medicineSchema],
});

function encodePassword(password) {
  return bcrypt.hash(password, encodeConfig.encodeLength);
}

function checkPassword({ password, hash }) {
  return bcrypt.compare(password, hash);
}

const Pharms = model("Pharms", schema);

export { Pharms, encodePassword, checkPassword };
