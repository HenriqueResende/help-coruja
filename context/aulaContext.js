import React, { useState, useContext } from "react";

export const AulaContext = React.createContext({});

export function AulaProvider({children}) {
    const [aulas, setAulas] = useState([]);

    async function getAulas(token, ra){
        try {
            const response = await fetch(
              `https://help-coruja.azurewebsites.net/api/aula/getAulaTutor?ra=${ra}`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Authorization': 'Bearer ' + token
                },
              }
            );
      
            const data = await response.json();
      
            setAulas(JSON.parse(data.json));
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <AulaContext.Provider value={{aulas, getAulas}}>
            {children}
        </AulaContext.Provider>
    )
}

export const useAula = () => useContext(AulaContext)
