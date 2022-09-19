import { Redis } from '@upstash/redis';

export const getShort = (longUrl) => {
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
  return shortUrl;
};

export async function getLink(code) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  let link = await redis.hget('links', code);

  return link;
}
