import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs";
import prismaDB from "@/lib/prismaUtils/prismaDB";
import {ZodSignInFromSchema} from "./zod/formValidation";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Google,
        Credentials({
            name: "credentials",
            async authorize(credentials) {
                try {
                    // validate the data
                    const validatedData = ZodSignInFromSchema.safeParse(credentials);
                    // Check if the data is not valid
                    if (!validatedData.success) {
                        return null;
                    }
                    // check the user is existing
                    const user = await prismaDB.user.findUnique({
                        where: {
                            email: validatedData.data.email,
                        },
                    });
                    // if user is not found
                    if (!user) {
                        return null;
                    }
                    // compare the password
                    // @ts-ignore
                    const isPasswordMatch = bcryptjs.compare(validatedData.data.password, user?.password);
                    // if the password is not matched
                    if (!isPasswordMatch) {
                        return null;
                    }
                    return user;
                }
                catch (error) {
                    console.error("Error parsing request body in credential function (auth.config.ts)", error);
                    return null;
                }
            }
        })
    ],
} satisfies NextAuthConfig