import { NextRequest, NextResponse } from "next/server";
import {ZodSignUpFromSchema} from "@/zod/formValidation";
import {ZodCustomErrorMessages} from "@/zod/ZodErrorHandle";
import prismaDB from "@/lib/prismaUtils/prismaDB";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); // Parse the request body
        // console.log(data);
        const validatedData = ZodSignUpFromSchema.safeParse(data);// Validate the data
        // console.log(validatedData);
        // Check if the data is valid
        if (!validatedData.success) {
            return NextResponse.json({ message: ZodCustomErrorMessages(validatedData.error.errors) }, { status: 400 });
        }
        // check if the email already exists
        const user = await prismaDB.user.findUnique({
            where: {
                email: validatedData.data.email,
            },
        });
        if (user) {
            return NextResponse.json({ message: "Email already in use" }, { status: 400 });
        }
        // check the password and confirm password
        if (validatedData.data.password !== validatedData.data.confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }
        // Hash the password
        const hashedPassword = await bcryptjs.hash(validatedData.data.password, 10);
        // If the data is valid, save it to the database
        await prismaDB.user.create({
            data: {
                email: validatedData.data.email,
                firstName: validatedData.data.firstName,
                lastName: validatedData.data.lastName,
                password: hashedPassword,
            },
        })
        return NextResponse.json({ message: "Account created successfully - NextResponse" }, { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "An error occurred- NextResponse" }, { status: 500 });
    }
}