import { NextRequest, NextResponse } from "next/server";
import { registerSchema, TRegisterSchema } from "@/lib/types/zodSchemes";
import { db } from "@/lib/db/index";
import { User } from "@/lib/db/models/user";
import jsonwebtoken from 'jsonwebtoken';


import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    const body = await request.json()
    const res = registerSchema.safeParse(body);

    if (!res.success) {
        return NextResponse.json({ message: 'test' })
    }

    try {
        const user = new User(db);
        const hashedPassword = await bcrypt.hash(res.data.password, 12);
        const result = await user.createUser({ ...res.data, password: hashedPassword });

        const token = jsonwebtoken.sign({ userId: result.id, username: result.username, userTag: result.tag }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });

        // redirect to main page
        return NextResponse.json({ token }, {
            headers: {
                'Set-Cookie': `authToken=${token}; path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, { status: 401 })
        }
    }
    return NextResponse.json({ message: 'test' })
}

