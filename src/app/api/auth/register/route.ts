import { NextRequest, NextResponse } from "next/server";
import { registerSchema, TRegisterSchema } from "@/lib/types/zodSchemes";
import { DrizzleAdapter } from "@/lib/db/dbAdaper";
import { db } from "@/lib/db/index";

import bcrypt from 'bcryptjs';

import { decode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
    // log request body to app/logs/request
    const body = await request.json();

    // validate body
    const res = registerSchema.safeParse(body);

    if (!res.success) {
        return NextResponse.json(res.error, { status: 400 })
    }

    res.data.password = await bcrypt.hash(res.data.password, 10);
    const da: any = DrizzleAdapter(db);
    // create user
    const user = await da.createUser(res.data as TRegisterSchema);

    return NextResponse.json({ message: 'test' })
}
