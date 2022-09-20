import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLink } from './utils/getUtils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const searchTerms = pathname.split('/');

  const code = searchTerms[searchTerms.length - 1];
  const url = await getLink(code);

  return NextResponse.redirect(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/go/:path*',
};
