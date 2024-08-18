import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import prismaDB from "@/lib/prismaUtils/prismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prismaDB),
    session: { strategy: "jwt" },
    ...authConfig,
})