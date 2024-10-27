import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User created successfully', user });
}
