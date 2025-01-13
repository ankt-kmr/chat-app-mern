import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    return (
        <UserContext value={{userInfo, setUserInfo}}>
            {children}
        </UserContext>
    )
}
