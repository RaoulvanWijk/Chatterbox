import { NextRequest, NextResponse } from "next/server";
import { registerSchema, TRegisterSchema } from "@/lib/types/zodSchemes";
import { db } from "@/lib/db/index";
import { User } from "@/lib/db/models/user";

import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", request.nextUrl), {
    headers: {
      "Set-Cookie": `authToken=; Path=/; HttpOnly; Max-Age=0;`,
    },
  });
}
