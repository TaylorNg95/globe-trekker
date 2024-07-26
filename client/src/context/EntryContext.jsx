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

    return <EntryContext.Provider value={{entries, setEntries}}>{children}</EntryContext.Provider>
}

export {EntryContext, EntryProvider}