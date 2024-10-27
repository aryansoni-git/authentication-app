import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Find the user in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token });
}
