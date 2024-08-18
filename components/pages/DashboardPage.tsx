"use client"

import React from 'react';
import {useCuruntUserSession} from "@/lib/OAuthUtils/useCuruntUserSession";

const DashboardPage = () => {
    const sessionUser = useCuruntUserSession()
    return (
        <div>
            dashboard page

            <div className="mt-4">
                <h1>{JSON.stringify(sessionUser) || "no session user"}</h1>
            </div>
        </div>
    );
};

export default DashboardPage;