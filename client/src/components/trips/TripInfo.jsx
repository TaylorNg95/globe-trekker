import React from 'react'

function TripInfo({trip}) {
  return (
    <div>
        <h2>TripCard</h2>
        <p>{trip.name}</p>
        <p>Total Miles: {trip.total_miles}</p>
    </div>
  )
}

export default TripInfo