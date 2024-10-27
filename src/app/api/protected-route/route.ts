import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Replace 'your-secret-key' with the same key you used to sign tokens
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        // If token is valid, respond with protected data
        return NextResponse.json({ message: `Hello, ${payload.email}! Welcome to your protected data.` });
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
    }
}
