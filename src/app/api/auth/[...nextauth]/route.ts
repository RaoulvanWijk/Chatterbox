import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };