import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const code = segments[segments.length - 1];
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  const longUrl = await redis.hget('links', code);
  console.log(code);
  console.log(longUrl);
  if (longUrl) {
    const validUrl = getValidUrl(longUrl);
    return NextResponse.redirect(validUrl);
  } else {
    return NextResponse.redirect(request.nextUrl.origin);
  }
}

const getValidUrl = (link) => {
  if (link.IndexOf('http://') == 0 || link.IndexOf('https://') == 0) {
    return link;
  } else {
    return `https://${link}`;
  }
};
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/go/:path*',
};
