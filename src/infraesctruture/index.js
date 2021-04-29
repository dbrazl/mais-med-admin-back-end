import express from "express";
import "dotenv/config";
import rateLimiter from "../application/middlewares/RateLimit";
import routes from "./routes";
import "../infraesctruture/database";
import cors from "cors";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(rateLimiter);
  }

  routes() {
    this.server.use("/api/v1", routes);
  }

  listen(port) {
    this.server.listen(port);
  }
}

export default App;
