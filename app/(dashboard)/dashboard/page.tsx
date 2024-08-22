import React from 'react';
import DashboardPage from "@/components/pages/DashboardPage";
import {auth} from "@/auth";

const Page = async () => {
    const session = await auth()
    console.log(session)
    return (
        <DashboardPage session={session}/>
    );
};

export default Page;