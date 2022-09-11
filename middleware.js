import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/go/:path*',
};
