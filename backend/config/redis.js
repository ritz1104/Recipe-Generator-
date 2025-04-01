const dotenv = require('dotenv').config();
const Redis = require("ioredis");

let redisInstance = null; 

function getRedisInstance() {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT, 
      password: process.env.REDIS_PASSWORD,
    });

    redisInstance.on("connect", () => {
      console.log(" Redis Connected");
    });

    redisInstance.on("error", (err) => {
      console.error(" Redis Error:", err);
    });
  }
  return redisInstance;
}

module.exports = getRedisInstance;
