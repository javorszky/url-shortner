import { Redis } from '@upstash/redis';
import { getShort } from '../../utils/getUtils';

export default async function handler(req, res) {
  const redis = new Redis({
    url: `${process.env.UPSTASH_REDIS_REST_URL}`,
    token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  });
  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ message: 'Error, url is invalif' });
    return;
  }
  let shortUrl = getShort(longUrl);

  let data = await redis.hset('links', { [shortUrl]: longUrl });
  res.status(200).send({ data });
}
