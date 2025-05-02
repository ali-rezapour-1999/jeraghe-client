import Redis from "ioredis";

const port = Number(process.env.REDIS_PORT) || 6379;
const db = Number(process.env.REDIS_DB) || 0;

if (isNaN(port) || isNaN(db)) {
  throw new Error("Invalid Redis port or db number");
}

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  // username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD || "",
  port,
  db,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 10,
});

export default redis;
