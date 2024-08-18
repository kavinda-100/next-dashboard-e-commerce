"use client";

import React from 'react';
import { DesktopNav, MobileNav } from '@/components/dashboardLayoutNav';
import {useCuruntUserSession} from "@/lib/OAuthUtils/useCuruntUserSession";


const LayOut = ({children}: Readonly<{children: React.ReactNode}>) => {
    const user = useCuruntUserSession();

    return (
        <section className="flex flex-row gap-2">
            <div className="hidden lg:flex"><DesktopNav /></div>
            <div className="flex lg:hidden"><MobileNav /></div>
            {children}
        </section>
    );
};

export default LayOut;