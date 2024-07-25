import React from 'react'

function TripCard({trip}) {
  function handleClick(){
    console.log(trip.id)
  }

  return (
    <div onClick={handleClick}>
      <h2>TripCard</h2>
      <p>{trip.name}</p>
      <p>{trip.country}</p>
      <p>Total Miles: {trip.total_miles}</p>
    </div>
  )
}

export default TripCard