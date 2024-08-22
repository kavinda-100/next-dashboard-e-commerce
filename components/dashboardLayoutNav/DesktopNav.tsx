"use client";

import React from 'react';
import {navigationBar} from "@/constant";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const DesktopNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const LogOut = () => {
        signOut().then(r => {
            console.log(r)
            router.push("/sign-in");
        });
    }

    return (
        <div className="flex flex-col space-y-4 p-3 w-full mx-w-[300px]">
            <div className="flex-col flex flex-1 gap-3 w-full">
                {
                    navigationBar.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                asChild
                                size={"lg"}
                                type={"button"}
                                variant={pathname === item.path ? "default" : "outline"}
                                className="w-full"
                            >
                                <Link href={item.path}>{item.label}</Link>
                            </Button>
                        )
                    })
                }
            </div>
            <Button
                size={"lg"}
                type={"button"}
                variant={"outline"}
                className="flex w-full"
                onClick={() => LogOut()}
            >
                Sign Out
            </Button>
        </div>
    );
};

export default DesktopNav;