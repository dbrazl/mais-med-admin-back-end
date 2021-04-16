import Mongoose from "mongoose";

import { databaseConfig } from "../config/database";

class Database {
  init() {
    try {
      Mongoose.connect(databaseConfig.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error("Can't create Mongo connection");
    }
  }
}

export default new Database();
