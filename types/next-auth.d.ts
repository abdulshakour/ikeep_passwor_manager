// types/next-auth.d.ts
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    created_at: string;
  };
};

declare module "next-auth" {
  interface Session {
    ExtendedUser;
  }
}

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     refreshToken?: string;
//     userInfo?: {
//       id: number;
//       name: string;
//       email: string;
//       is_active: boolean;
//       created_at: string;
//     };
//   }
//
//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//     expiresIn?: number;
//     userInfo?: {
//       id: number;
//       name: string;
//       email: string;
//       is_active: boolean;
//       created_at: string;
//     };
//   }
// }
