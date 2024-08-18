import React from 'react';
import { DesktopNav, MobileNav } from '@/components/dashboardLayoutNav';

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <section className="flex flex-row gap-2">
            <div className="hidden lg:flex"><DesktopNav /></div>
            <div className="flex lg:hidden"><MobileNav /></div>
            {children}
        </section>
    );
};

export default DashboardLayout;