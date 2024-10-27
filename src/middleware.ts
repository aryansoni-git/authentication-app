import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Authentication token is required' }, { status: 401 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/protected-route/', '/api/protected-route/:path*'], // Protect routes as needed
};