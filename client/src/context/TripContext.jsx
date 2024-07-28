import {createContext, useState, useEffect, useContext} from 'react'
import { UserContext } from './UserContext'

const TripContext = createContext({})

function TripProvider({children}) {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)

    const {user, addEntry} = useContext(UserContext)
    
    useEffect(() => {
        async function getTrips() {
            console.log('TripContext useEffect')
            const response = await fetch('/api/trips')
            const trips = await response.json()
            setTrips(trips)
            setLoading(false)
        }
        getTrips()
    }, [])

    async function addTrip(trip) {
        const response = await fetch('/api/trips', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        })
        if (response.status == 201){
            const newTrip = await response.json()
            setTrips([...trips, newTrip])
            addEntry({
                date: '00-00-00',
                miles: 0,
                user_id: user.id,
                trip_id: newTrip.id
            })
        } else {
            const error = await response.json()
            console.log(error)
        }
    }
    
    if (loading == true){
        return <h1>Loading...</h1>
    } else {
        console.log('TripContext component')
        return <TripContext.Provider value={{trips, addTrip}}>{children}</TripContext.Provider>
    }
}

export {TripContext, TripProvider}