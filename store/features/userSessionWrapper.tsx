"use client"

import React from "react";
import {Session} from "next-auth";
import {setUser} from "./LogedInUserSclice";
import {useAppDispatch} from "../hook";

type UserSessionWrapperType = {
    children: React.ReactNode
    session: Session | null
}

const UserSessionWrapper = ({children, session}: UserSessionWrapperType) => {
    const dispatch = useAppDispatch();
    if(session){
        dispatch(setUser(session.user));
    }
    else {
        dispatch(setUser(null));
    }
    return (
        <>
            {children}
        </>
    );
};

export default UserSessionWrapper;