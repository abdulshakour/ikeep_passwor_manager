import NextAuth, { AuthError, type DefaultSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export class InvalidLoginError extends AuthError {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials || {};
        try {
          const response = await axios.post(
            `${URL}/auth/login`,
            `grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`,

            {
              withCredentials: true, // Include cookies with the login request
            },
          );

          const { access_token, expires_in } = response.data;

          return {
            access_token,
            expires_at: Date.now() + expires_in * 1000,
          };
        } catch (error) {
          console.log("UUUSER", error.response);
          throw new InvalidLoginError("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store initial login information
        return {
          ...token,
          access_token: user.access_token,
          expires_at: user.expires_at,
        };
      }

      // If the access token is still valid, return the token
      if (Date.now() < token.expires_at) {
        return token;
      }

      // Access token has expired, use the refresh token to get a new one
      try {
        const response = await axios.post(
          `${URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Important: ensures the refresh_token cookie is sent with the request
          },
        );

        const { access_token, expires_in } = response.data;

        // Update token details
        return {
          ...token,
          access_token,
          expires_at: Date.now() + expires_in * 1000,
        };
      } catch (error) {
        console.log("Error", error.response);
        // console.error(
        //   "Error refreshing access token:",
        //   error.response?.data || error.message,
        // );
        return { ...token, error: "RefreshTokenError" };
      }
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
