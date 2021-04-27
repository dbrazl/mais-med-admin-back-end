import redis from "redis";
import redisConfig from "../config/redis";

const redis = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
});

export default redis;
