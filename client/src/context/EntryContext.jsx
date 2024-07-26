import {createContext, useState, useContext, useEffect} from 'react'
import { UserContext } from './UserContext'

const EntryContext = createContext({})

function EntryProvider({children}) {
    const [entries, setEntries] = useState([])
    console.log('entry provider')

    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user) {
            setEntries(user.entries)
            console.log('entry use effect')
        }
    }, [user])

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

    return <EntryContext.Provider value={{entries, setEntries, deleteEntry, addEntry}}>{children}</EntryContext.Provider>
}

export {EntryContext, EntryProvider}