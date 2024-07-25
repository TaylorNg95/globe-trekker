import {createContext, useState} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)

    function login(user){
        setLoggedIn = true
        setUser(user)
    }

    function logout(){
        setLoggedIn = false
        setUser(null)
    }

    return <UserContext.Provider value={{loggedIn, user, login, logout}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}