import { NextRequest, NextResponse } from "next/server";
import { registerSchema, TRegisterSchema } from "@/lib/types/zodSchemes";
import { db } from "@/lib/db/index";
import { User } from "@/lib/db/models/user";

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
    } catch(err: unknown) {
        console.log(err)
    }


    

    return NextResponse.json({ message: 'test' })
}
