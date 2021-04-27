import express from "express";
import "dotenv/config";
import limiter from "../services/rateLimit";
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
    this.server.use(limiter);
  }

  routes() {
    this.server.use("/api/v1", routes);
  }

  listen(port) {
    this.server.listen(port);
  }
}

export default App;
