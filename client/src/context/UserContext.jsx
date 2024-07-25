import {createContext, useState} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(true)

    return <UserContext.Provider value={{loggedIn}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}