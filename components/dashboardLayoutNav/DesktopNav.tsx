"use client";

import React from 'react';
import {navigationBar} from "@/constant";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";

const DesktopNav = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col space-y-4 p-3 w-full mx-w-[300px]">
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
    );
};

export default DesktopNav;