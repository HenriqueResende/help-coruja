import React, { useState, useContext } from "react";

export const TokenContext = React.createContext({});

export function TokenProvider({children}) {
    const [token, setToken] = useState("");
    const [ra, setRa] = useState("");

    function defToken(token){
        setToken(token)
    }

    function defRa(ra){
        setRa(ra)
    }

    return (
        <TokenContext.Provider value={{token, defToken, ra, defRa}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = () => useContext(TokenContext)
