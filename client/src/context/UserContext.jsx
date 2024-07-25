import {createContext, useState, useEffect} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)

    useEffect(() => {
        fetch('/api/check_session')
        .then(response => {
            if (response.status == 200) {
                response.json()
                .then(user => login(user))
            }
        })
    }, [])

    function login(user){
        setLoggedIn(true)
        setUser(user)
    }

    function logout(){
        setLoggedIn(false)
        setUser(null)
    }

    return <UserContext.Provider value={{loggedIn, user, login, logout}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}