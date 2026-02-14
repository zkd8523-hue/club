import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: 'user' | 'partner' | 'admin';
      membershipTier?: 'standard' | 'gold' | 'elite';
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: 'user' | 'partner' | 'admin';
    membershipTier?: 'standard' | 'gold' | 'elite';
  }
}
