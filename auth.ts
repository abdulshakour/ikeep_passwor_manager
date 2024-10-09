import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
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
          console.log("---__--", data);
          if (!response.ok) {
            console.log("FROM__-_", data.detail);
            throw new InvalidLoginError();
          }

          console.log("FROM_BACK:::", data);
          user = data;
        } catch (error) {
          console.error("Authentication error:", error);
        }

        return user;
      },
    }),
  ],
  // pages: {
  //   signIn: "/sign-in",
  //   error: "/sign-in",
  // },
});
