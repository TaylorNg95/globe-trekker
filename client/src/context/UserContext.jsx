import {createContext, useState, useEffect} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)
    console.log('user provider')

    useEffect(() => {
        fetch('/api/check_session')
        .then(response => {
            console.log('user use effect')
            if (response.status == 200) {
                return response.json()
            } else if (response.status == 401) {
                return response.json().then(error => {
                    return Promise.reject(error)
                })
            }
        })
        .then(currentUser => {
            login(currentUser)
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