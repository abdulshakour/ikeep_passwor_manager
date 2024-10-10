import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { CredentialsSignin } from "next-auth";

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
        let user;

        if (!credentials?.email || !credentials?.password) return null;

        const { csrfToken, callbackUrl, ...formData } = credentials;

        const { email, password } = formData;
        try {
          const response = await fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`,
          });

          const data = await response.json();
          if (!response.ok) {
            throw new InvalidLoginError(data.detail);
          }

          /*     console.log("FROM_BACK:::", data); */
          user = data;
        } catch (error) {
          throw new InvalidLoginError(error.message);
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        /*  console.log("[from_CALLBACK]", user); */
        token.accessToken = user.access_token;
        token.expiresIn = Date.now() / 1000 + user.expires_in;
        const userInf = await fetch(`${URL}/users/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const data = await userInf.json();
        token.userInfo = data;
        console.log("{{User}}", token.userInfo);
      }

      if (Date.now() > token.expiresAt) {
        console.log("Token has expired");
        // You might want to implement a refresh token mechanism here
        // or return null to force a new sign in
        return null;
      }

      return token;
    },

    async session({ session, token }) {
      /*   console.log("[[session]]", token); */
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.userInfo = token.userInf;

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
