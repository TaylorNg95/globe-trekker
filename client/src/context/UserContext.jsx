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

    async function addEntry(entry) {
        const response = await fetch(`/api/entries`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })
        if (response.status == 201){
            const newEntry = await response.json()
            setEntries([...entries, newEntry])
        } else {
            console.log('Oops something went wrong')
        }
    }

    async function deleteEntry(id) {
        const response = await fetch(`/api/entries/${id}`, {
          method: 'DELETE'
        })
        if (response.status == 204){
            setEntries(entries.filter(ent => ent.id != id))
        }
      }

    return <UserContext.Provider value={{loggedIn, user, login, logout, entries, setEntries, addEntry, deleteEntry}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}