import { Redis } from '@upstash/redis';
export default async function handler(req, res) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const { longUrl } = req.body;
  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ message: 'Error, url is invalif' });
    return;
  }
  let shortEnd = longUrl.split('/');
  let slug = shortEnd[shortEnd.length - 1];
  let slugSubstrings = slug.split('-');
  let letters = [];
  for (let string of slugSubstrings) {
    letters = [...letters, ...string];
  }
  let newSlug = [];
  for (let i = 0; i <= 11; i++) {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    if (i % 2 == 0) {
      letter = letter.toUpperCase();
    }
    newSlug = [...newSlug, letter];
  }
  let newSlugJoin = newSlug.join('');
  let shortUrl = newSlugJoin;

  let data = await redis.hset('links', { [shortUrl]: longUrl });
  res.status(200).send({ message: 'success' });
}
