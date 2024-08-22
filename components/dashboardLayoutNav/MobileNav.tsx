"use client";

import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription, SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button";
import { FaAlignJustify } from "react-icons/fa";
import {navigationBar} from "@/constant";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const MobileNav = () => {
    const pathname = usePathname()
    const router = useRouter();

    const LogOut = () => {
        signOut().then(r => {
            console.log(r)
            router.push("/sign-in");
        });
    }

    return (
        <Sheet>
            <SheetTrigger><FaAlignJustify className="w-5 h-5"/></SheetTrigger>
            <SheetContent className="mt-3">
                <div className="flex flex-col space-y-4 p-3 w-full">
                    {
                        navigationBar.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    asChild
                                    size={"lg"}
                                    type={"button"}
                                    variant={pathname === item.path ? "default" : "outline"}
                                >
                                    <Link href={item.path}>{item.label}</Link>
                                </Button>
                            )
                        })
                    }
                </div>
                <SheetFooter>
                    <Button
                        size={"lg"}
                        type={"button"}
                        variant={"outline"}
                        className="flex w-full"
                        onClick={() => LogOut()}
                    >
                        Sign Out
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;