import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import api from "@/lib/baseApi";
import Cookies from "js-cookie";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        try {
          const response = await api.post("auth/google-login/", {
            access_token: account.access_token,
          });

          const { access_token, refresh_token, user_slug } = response.data;
          const accessTokenCookie = Cookies.set("accessToken", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
          });

          const refreshTokenCookie = Cookies.set(
            "refreshToken",
            refresh_token,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            },
          );

          const userSlugCookie = Cookies.set("userSlug", user_slug, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });

          const responseHeaders = new Headers();
          responseHeaders.append("Set-Cookie", accessTokenCookie || "");
          responseHeaders.append("Set-Cookie", refreshTokenCookie || "");
          responseHeaders.append("Set-Cookie", userSlugCookie || "");

          return true;
        } catch {
          return false;
        }
      }
      return true;
    },

    async session({ session }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});

export const GET = handler;
export const POST = handler;
