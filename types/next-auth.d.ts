// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    userInfo?: {
      id: number;
      name: string;
      email: string;
      is_active: boolean;
      created_at: string;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    userInfo?: {
      id: number;
      name: string;
      email: string;
      is_active: boolean;
      created_at: string;
    };
  }
}
