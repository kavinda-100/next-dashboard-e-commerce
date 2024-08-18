import {useSession} from "next-auth/react";

export const useCuruntUserSession = () => {
    const session = useSession()
    return  session?.data?.user
};