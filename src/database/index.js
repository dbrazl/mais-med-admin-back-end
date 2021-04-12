import Mongoose from "mongoose";

class Database {
  init() {
    try {
      Mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error("Can't create Mongo connection");
    }
  }
}

export default new Database();
