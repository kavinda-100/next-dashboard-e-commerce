import {NextRequest, NextResponse} from "next/server";
import {ZodSignInFromSchema} from "@/zod/formValidation";
import {ZodCustomErrorMessages} from "@/zod/ZodErrorHandle";
import prismaDB from "@/lib/prismaUtils/prismaDB";
import {signIn} from "@/auth";
import bcryptjs from "bcryptjs";
import {AuthError} from "next-auth";


export async function POST(req: NextRequest){
    try {
        const data = await req.json(); // Parse the request body
        // validate the data
        const validatedData = ZodSignInFromSchema.safeParse(data);
        // Check if the data is not valid
        if(!validatedData.success){
            return NextResponse.json({message: ZodCustomErrorMessages(validatedData.error.errors)}, {status: 400});
        }
        // check the user is existing
        const user = await prismaDB.user.findUnique({
            where: {
                email: validatedData.data.email,
            },
        });
        // if user is not found
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 400});
        }
        // if the user is found and password is matched

        /**
         * check whether the user is email verified
         * */

        // sign in the user
        const result = await signIn(
            "credentials",
            {
                email: validatedData.data.email,
                password: validatedData.data.password,
                redirect: false // prevent automatic redirection
            });
        //if the result has an error
        if(result instanceof AuthError){
            // console.log("result", result.type)
            switch(result.type){
                case "CredentialsSignin": {
                    return NextResponse.json({message: "Invalid credentials"}, {status: 400});
                }
                case "AccessDenied": {
                    return NextResponse.json({message: "Access denied"}, {status: 400});
                }
                default:{
                    return NextResponse.json({message: "Something went wrong!"}, {status: 400});
                }
            }
        }
        // if the signIn successfully
        return NextResponse.json({message: "Sign in successfully"}, {status: 200});

    }
    catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "An error occurred- NextResponse" }, { status: 500 });
    }
}