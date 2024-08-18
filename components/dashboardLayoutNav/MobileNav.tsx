"use client";

import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button";
import { FaAlignJustify } from "react-icons/fa";
import {navigationBar} from "@/constant";
import {usePathname} from "next/navigation";
import Link from "next/link";

const MobileNav = () => {
    const pathname = usePathname()

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
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;