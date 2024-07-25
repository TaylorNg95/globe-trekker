import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/check_session')
        .then(response => {
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
            navigate('/')
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