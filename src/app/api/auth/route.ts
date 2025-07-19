import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (pathname.endsWith('/register')) {
    return NextResponse.json({ success: false, message: 'Use /api/auth/register for registration' });
  } else if (pathname.endsWith('/login')) {
    return NextResponse.json({ success: false, message: 'Use /api/auth/login for login' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid route' });
  }
}
