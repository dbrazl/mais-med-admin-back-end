import { Schema, model } from "mongoose";
import { encodeConfig } from "../../infraesctruture/config/encode";
import bcrypt from "bcryptjs";

const schema = new Schema({
  rawCpf: String,
  date: String,
  schedule: String,
});

const Vacination = model("Vacination", schema);

function encodeCpf(cpf = "") {
  return bcrypt.hash(cpf, encodeConfig.encodeLength);
}

export { Vacination, encodeCpf };
