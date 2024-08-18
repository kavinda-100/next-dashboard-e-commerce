import React from "react";


type navigationBarType = {
    label: string,
    path: string,
    icon?: React.ReactNode,
}

export const navigationBar: navigationBarType[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Profile",
        path: "/profile",
    },
    {
        label: "product",
        path: "/product",
    },
    {
        label: "category",
        path: "/category",
    },
    {
        label: "Orders",
        path: "/order",
    },
    {
        label: "Users",
        path: "/manage-user",
    },
    {
        label: "Setting",
        path: "/setting",
    }
    ]