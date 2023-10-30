import { NextRequest, NextResponse } from "next/server";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";
import { db } from "@/lib/db/index";
import { User } from "@/lib/db/models/user";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const body = await request.json()

    const res = loginSchema.safeParse(body);

    if (!res.success) {
        return NextResponse.json({ message: 'test' })
    }

    try {
        const userM = new User(db);
        const user = await userM.getUserByEmail(res.data.email);

        if(!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compareSync(res.data.password, user.password ?? '');
        if(!passwordMatch) {
            throw new Error('Password does not match');
        }

        const token = jsonwebtoken.sign({ userId: user.id, username: user.username, userTag: user.tag }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });

        // redirect to main page
        return NextResponse.json({ token }, {
            headers: {
                'Set-Cookie': `authToken=${token}; path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
            }
        })

        
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({
                error: error.message
            }, { status: 401 })
        }
    }
    return NextResponse.json({ message: 'test' })
}