import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); // Parse the request body
        console.log(data); // Log the parsed data

        // Perform any necessary operations with the data here

        return NextResponse.json({ message: "Account created successfully - NextResponse" }, { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "An error occurred- NextResponse" }, { status: 500 });
    }
}