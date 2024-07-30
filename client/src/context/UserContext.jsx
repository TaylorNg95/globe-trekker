import {createContext, useState, useEffect} from 'react'

const UserContext = createContext({})

function UserProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [user, setUser] = useState(false)
    const [entries, setEntries] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkUser() {
            const response = await fetch('/api/check_session')
            if (response.status == 200) {
                const user = await response.json()
                login(user)
            }
            setLoading(false)
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
        setEntries(null)
    }

    async function addEntry(entry) {
        const response = await fetch('/api/entries', {
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
            const error = await response.json()
        }
    }

    async function editEntry(entry, id) {
        const response = await fetch(`/api/entries/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })
        if (response.status == 200){
            const editedEntry = await response.json()
            setEntries(entries.map(ent => {
                if (ent.id == id){
                    return editedEntry
                } else return ent
            }))
        } else {
            const error = await response.json()
        }
    }

    async function deleteEntry(id) {
        const response = await fetch(`/api/entries/${id}`, {
          method: 'DELETE'
        })
        if (response.status == 204){
            setEntries(entries.filter(ent => ent.id != id))
        } else {
            const error = await response.json()
        }
      }
    
    if (loading == true){
        return <h1>Loading...</h1>
    } else {
        return <UserContext.Provider value={{loggedIn, user, login, logout, entries, setEntries, addEntry, editEntry, deleteEntry}}>{children}</UserContext.Provider>
    }
}

export {UserContext, UserProvider}