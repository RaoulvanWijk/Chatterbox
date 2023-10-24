import { NextResponse, NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { jwtVerify } from "jose";

const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  if (
    (request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register") && request.cookies.get("authToken") == undefined
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/app") || request.nextUrl.pathname.startsWith("/auth")) {
    const authToken = request.cookies.get("authToken");

    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
    try {
      const payload = await jwtVerify(
        authToken.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (
        request.nextUrl.pathname === "/auth/login" ||
        request.nextUrl.pathname === "/auth/register"
      ) {
        return NextResponse.redirect(new URL("/app/channels/@me", request.nextUrl));
      }
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
