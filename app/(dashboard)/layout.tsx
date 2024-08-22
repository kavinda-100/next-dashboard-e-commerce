import React from 'react';
import { DesktopNav, MobileNav } from '@/components/dashboardLayoutNav';
import Header from "@/components/Header";
import {auth} from "../../auth";
import UserSessionWrapper from "@/store/features/userSessionWrapper";

const DashboardLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const session = await auth()
    return (
        <UserSessionWrapper session={session}>
        <section>
            <Header />
            <div className="flex flex-row gap-2 px-2">
                <div className="hidden lg:flex"><DesktopNav/></div>
                <div className="flex lg:hidden"><MobileNav/></div>
                {children}
            </div>
        </section>
        </UserSessionWrapper>
    );
};

export default DashboardLayout;