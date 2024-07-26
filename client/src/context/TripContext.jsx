import {createContext, useState, useEffect} from 'react'

const TripContext = createContext({})

function TripProvider({children}) {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    console.log('trips provider')
    useEffect(() => {
        fetch('/api/trips')
        .then(response => response.json())
        .then(trips => {
            setTrips(trips)
            setLoading(false)
            console.log('trip use effect')
        })
    }, [])

    if (loading == true){
        return <h1>Loading...</h1>
    } else {
        return <TripContext.Provider value={{trips}}>{children}</TripContext.Provider>
    }
}

export {TripContext, TripProvider}