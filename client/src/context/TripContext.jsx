import {createContext, useState, useEffect} from 'react'

const TripContext = createContext({})

function TripProvider({children}) {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch('/api/trips')
        .then(response => response.json())
        .then(trips => setTrips(trips))
    }, [])

    return <TripContext.Provider value={{trips}}>{children}</TripContext.Provider>
}

export {TripContext, TripProvider}