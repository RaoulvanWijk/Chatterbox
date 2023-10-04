import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@/lib/db/dbAdaper";
import { db } from "@/lib/db/index"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";

import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 3000,
    user: {
      id: 'id',
      username: 'username',
      email: 'email',
      password: 'password',
      image: 'image',
    },
 }, 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        
        const res = loginSchema.safeParse(credentials);
        if(!res.success) {
          return null;
        }
        const da : any = DrizzleAdapter(db);
        const user = await da.getUserByEmail(res.data.email);
        if(!user) {
          return null;
        }
        const passwordMatch = await bcrypt.compareSync(res.data.password, user.password);
        if(!passwordMatch) {
          return null;
        }
        return user;
      }
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  callbacks: {
    session({ session, token, user }) {
      console.log("session", session, token, user);
      
      return session // The return type will match the one returned in `useSession()`
    },
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };