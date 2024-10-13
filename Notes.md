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

declare module "next-auth" {
/\*\*

- Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  _/
  interface Session {
  accessToken?: string;
  user: {
  /\*\* The user's postal address. _/
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  /\*\*
  _ By default, TypeScript merges new interface properties and overwrites existing ones.
  _ In this case, the default session user properties will be overwritten,
  _ with the new ones defined above. To keep the default session user properties,
  _ you need to add them back into the newly declared interface.
  \*/
  } & DefaultSession["user"];
  }
  }

export const { handlers, signIn, signOut, auth } = NextAuth({
providers: [
Credentials({
authorize: async (credentials) => {
let user = null;

        if (!credentials?.email || !credentials?.password) return null;

        const { csrfToken, callbackUrl, ...formData } = credentials;

        const { email, password } = formData;
        try {
          const response = await axios.post(
            `${URL}/auth/login`,
            `grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            },
          );

          /*    console.log("[RESPONSE]", response); */
          const Data = response.data;

          /*     console.log("{{DATA}}", Data); */
          user = Data;
        } catch (error) {
          if (error.response) {
            // console.log("[ERROR]", error.response.data);
            // console.log("Error status:", error.response.status);
            throw new InvalidLoginError(error.response.data.detail);
          }
          throw new InvalidLoginError(error.message);
        }

        return user;
      },
    }),

],

callbacks: {
async jwt({ token, user }) {
if (user) {
token.accessToken = user.access_token;
token.expiresIn = Date.now() + user.expires_in \* 1000;
const userInf = await fetch(`${URL}/users/me`, {
method: "GET",
headers: {
Accept: "application/json",
Authorization: `Bearer ${token.accessToken}`,
},
});
const data = await userInf.json();
token.userInfo = data;
}

      if (Date.now() > token.expiresIn) {
        console.log("[[[[[[[[[[[[[[[Token has expired");

        try {
          const response = await axios.post(`${URL}/auth/refresh`, {
            headers: {
              Accept: "application/json",
            },
            withCredentials: true, // This is equivalent to including credentials
          });

          console.log("REFRESH__", response);
          const data = response.data;
          token.accessToken = data.access_token;
          token.expiresIn = Date.now() + data.expires_in * 1000;
          token.test = "Welcome to me";
          console.log("it works fine");
        } catch (error) {
          /*     console.log("ERRRRRR", error.response); */
          console.log(
            "EEEERRRR",
            error.response ? error.response.data : error.message,
          );
          return null;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // console.log("[[Token]]", token);
      session.accessToken = token.accessToken;
      session.user = token.userInfo;

      return session;
    },

},
pages: {
signIn: "/sign-in",
},
});
