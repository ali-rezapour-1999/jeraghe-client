import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST!,
  password:process.env.REDIS_PASSWORD!,
  port: Number(process.env.REDIS_PORT!),
  db: Number(process.env.REDIS_DB!),
});

export default redis;
