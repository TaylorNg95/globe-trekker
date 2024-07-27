import {createContext, useState, useEffect} from 'react'

const TripContext = createContext({})

function TripProvider({children}) {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    console.log('trips provider')
    useEffect(() => {
        async function getTrips() {
            const response = await fetch('/api/trips')
            const trips = await response.json()
            setTrips(trips)
            setLoading(false)
        }
        getTrips()
    }, [])

    if (loading == true){
        return <h1>Loading...</h1>
    } else {
        return <TripContext.Provider value={{trips}}>{children}</TripContext.Provider>
    }
}

export {TripContext, TripProvider}