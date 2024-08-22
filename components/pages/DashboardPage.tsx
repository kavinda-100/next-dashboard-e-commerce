"use client"

import React from 'react';
import {useCuruntUserSession} from "@/lib/OAuthUtils/useCuruntUserSession";
import {PagePropsForSession} from "@/types";
import {useAppSelector} from "@/store/hook";

type DashboardPageProps = PagePropsForSession

const DashboardPage = ({session}: DashboardPageProps) => {
    const sessionUser = useCuruntUserSession()
    const user = useAppSelector(state => state.LogInUser.user)
    return (
        <div>
            dashboard page

            <div className="mt-4">
                <h1>from sever comp to client</h1>
                <h1>{JSON.stringify(session?.user.lastName) || "no session user"}</h1>
            </div>

            <div className="mt-4">
                <h1>from direct client</h1>
                <h1>{JSON.stringify(sessionUser) || "no session user"}</h1>
            </div>
            <div className="mt-4">
                <h1>form redux</h1>
                <h1>{JSON.stringify(user) || "no session user"}</h1>
                {user?.firstName}
            </div>
        </div>
    );
};

export default DashboardPage;