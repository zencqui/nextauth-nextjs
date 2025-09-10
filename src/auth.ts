import NextAuth from "next-auth";
import "next-auth/jwt";

import GitHub from "next-auth/providers/github";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub, Auth0],
    basePath: "/auth",
    callbacks: {
    authorized({ request, auth }) {
      // const { pathname } = request.nextUrl
      // if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "auth0") {
        return { ...token, accessToken: account.access_token }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session
    },
    async redirect({ url, baseUrl }) {
              // Allows relative callback URLs
              if (url.startsWith("/")) return `${baseUrl}${url}`;
              // Allows callback URLs on the same origin
              else if (new URL(url).origin === baseUrl) return url;
              return baseUrl; // Fallback to base URL if conditions not met
            },
  },
    session: {
        strategy: "jwt",
    },
    secret: "8x/b2P4kCguanNzKicdvUdOA760uY4jMgQLyOMMFxN0=",
});

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}