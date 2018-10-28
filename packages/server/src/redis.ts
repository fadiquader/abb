
import * as Redis from "ioredis";

const isProd = process.env.NODE_ENV === 'production';
export const redis = isProd ? new Redis(process.env.REDIS_URL) : new Redis();
