import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { encodeConfig } from "../../infraesctruture/config/encode";

const schema = new Schema({
  name: String,
  date: String,
  schedule: String,
  hashCpf: String,
});

const Vacine = model("Vacine", schema);

function encodeCpf(cpf = "") {
  return bcrypt.hash(cpf, encodeConfig.encodeLength);
}

export { Vacine, encodeCpf };
