import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import api from "@/lib/baseApi";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const response = await api.post("auth/google-login/", {
            access_token: account.access_token,
          });

          account.djangoToken = response.data.key;
          account.accessToken = account.access_token;
          account.refreshToken = account.refresh_token;
          account.sub = profile?.sub;
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.djangoToken = account.djangoToken;
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
        token.sub = account.sub as string;
      }
      return token;
    },

    async session({ session, token }) {
      session.djangoToken = token.djangoToken as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.sub = token.sub as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
