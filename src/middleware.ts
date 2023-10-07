import { NextResponse, NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { jwtVerify } from "jose";

const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register"
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/app")) {
    const authToken = request.cookies.get("authToken");

    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    try {
      const payload = await jwtVerify(
        authToken.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl), {
        headers: {
          "Set-Cookie": `authToken=; Path=/; HttpOnly; Max-Age=0;`,
        },
      });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/(.*)", "/auth/(.*)"],
};
