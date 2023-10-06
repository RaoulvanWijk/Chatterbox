import { NextRequest, NextResponse } from "next/server";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";
import { DrizzleAdapter } from "@/lib/db/dbAdaper";
import { db } from "@/lib/db/index";

import bcrypt from 'bcryptjs';

import { decode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
    // const res = loginSchema.safeParse(request.body);
    // if (!res.success) {
    //     return NextResponse.json({ message: 'test' })
    // }
    // const da: any = DrizzleAdapter(db);
    // const user = await da.getUserByEmail(res.data.email);
    // if (!user) {
    //     return null;
    // }
    // const passwordMatch = await bcrypt.compareSync(res.data.password, user.password);
    // if (!passwordMatch) {
    //     return null;
    // }
    return NextResponse.json({ message: 'test' })
}
