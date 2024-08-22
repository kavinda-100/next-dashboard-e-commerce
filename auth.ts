import NextAuth, {type DefaultSession} from "next-auth"
import authConfig from "@/auth.config"
import prismaDB from "@/lib/prismaUtils/prismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter"
import {UserRole} from "@prisma/client";

//extend the ser type
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    isTwoFactorEnabled: boolean
    isOAuthAccount: boolean
    firstName: string
    lastName: string
    isEmailVerified: boolean
}

//extend the session to add user and role
declare module "next-auth" {
    interface Session{
        user: ExtendedUser
    }
}

//extend the jwt to add a role
declare module "@auth/core/jwt" {
    interface JWT{
        role?: UserRole
        isTwoFactorEnabled?: boolean
        isOAuthAccount?: boolean
        firstName: string
        lastName: string
        isEmailVerified: boolean
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
    callbacks:{
        async session({session, token}){
            //check if session has user and token has sub
            if(session.user && token.sub){
                session.user.id = token.sub
            }
            if(token.role && session.user){
                session.user.role = token.role
            }
            if(session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
                session.user.isOAuthAccount = token.isOAuthAccount as boolean
                session.user.firstName = token.firstName as string
                session.user.lastName = token.lastName as string
                session.user.email = token.email as string
                session.user.isEmailVerified = token.isEmailVerified as boolean;
            }
            return session
        },
        async jwt({token,}){
            //check if token has user id(sub) if not it means user has log out.
            if(!token.sub) return token
            //fetch user from db
            const user = await prismaDB.user.findUnique({
                where:{
                    id: token.sub
                }
            })
            //if user didn't found return token
            if(!user) {
                return token
            }
            else {
                // Set token.isOAuth based on the account provider or the Account retrieved from the database
                token.isTwoFactorEnabled = user.isTwoFactorEnabled as boolean
                token.isOAuthAccount = user.isOAuthAccount as boolean
                token.role = user.role as UserRole
                token.firstName = user.firstName as string
                token.lastName = user.lastName as string
                token.email = user.email as string
                token.isEmailVerified = user.isEmailVerified as boolean
            }

            return token
        },
    },
    adapter: PrismaAdapter(prismaDB),
    session: { strategy: "jwt" },
    ...authConfig,
})