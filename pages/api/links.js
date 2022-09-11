import { Redis } from '@upstash/redis';
export default async function handler(req, res) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  let links = await redis.hgetall('links');
  res.status(200).send({ links });
}
