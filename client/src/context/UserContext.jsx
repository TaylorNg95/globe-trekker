import {createContext, useState, useEffect} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)
    const [entries, setEntries] = useState(null)

    useEffect(() => {
        async function checkUser() {
            const response = await fetch('/api/check_session')
            if (response.status == 200) {
                const user = await response.json()
                login(user)
            }
        }
        checkUser()
    }, [])

    function login(user){
        setLoggedIn(true)
        setUser(user)
        setEntries(user.entries)
    }

    function logout(){
        setLoggedIn(false)
        setUser(null)
    }

    function addEntry(entry) {
        fetch(`/api/entries`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })
        .then(response => {
            if (response.status == 201) {
                return response.json()
            } else if (response.status == 422) {
                return response.json().then(error => {
                    return Promise.reject(error)
                })
            }
        })
        .then(newEntry => {
          setEntries([...entries, newEntry])
        })
    }

    function deleteEntry(id) {
        fetch(`/api/entries/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          setEntries(entries.filter(ent => ent.id != id))
        })
      }

    return <UserContext.Provider value={{loggedIn, user, login, logout, entries, setEntries, addEntry, deleteEntry}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}