import React from 'react'
import TripCard from './TripCard'

function TripList({trips}) {
  const trips_list = trips
  const tripCards = trips_list.map(trip => <TripCard key={trip.id} trip={trip}/>) 

  return (
    <>
      <p>TripList</p>
      {tripCards}
    </>
  )
}

export default TripList