import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { encodeConfig } from "../../infraesctruture/config/encode";

const schema = new Schema({
  name: String,
  email: String,
  password: String,
});

function encodePassword(password = "") {
  return bcrypt.hash(password, encodeConfig.encodeLength);
}

const User = model("User", schema);

export { User, encodePassword };
