"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const Social =  () => {

    return (
        <div className="flex w-full items-center justify-center">
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => {}}
            >
                <FcGoogle className="w-5 h-5" />
                <span className="ml-2">Sign in with Google</span>
            </Button>
        </div>
    );
};

export default Social;
