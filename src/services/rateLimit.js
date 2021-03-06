import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "../infraesctruture/database/redis";

const limiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "ratelimit",
  points: 3,
  duration: 1,
});

export default limiter;
