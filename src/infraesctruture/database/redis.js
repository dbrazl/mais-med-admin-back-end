import redis from "redis";
import redisConfig from "../config/redis";

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
});

export default client;
