import React from 'react';
import { DesktopNav, MobileNav } from '@/components/dashboardLayoutNav';
import Header from "@/components/Header";

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {

    return (
        <section>
            <Header />
            <div className="flex flex-row gap-2 px-2">
                <div className="hidden lg:flex"><DesktopNav/></div>
                <div className="flex lg:hidden"><MobileNav/></div>
                {children}
            </div>
        </section>
    );
};

export default DashboardLayout;