import React from 'react';
import {ModeToggle} from "@/components/modeToggole";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

const Header = () => {
    return (
        <header className="flex justify-between items-center p-3 shadow-sm">
            <h1 className={cn("text-lg lg:text-2xl text-pretty", poppinsFont.className)}>Next Js dashboard</h1>

            <div className="flex justify-center items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/3056485?v=4" alt="avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;