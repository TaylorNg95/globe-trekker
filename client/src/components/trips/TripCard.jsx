import React from 'react'
import { useNavigate } from 'react-router-dom'

function TripCard({trip}) {
// /my-trips/:id
  const navigate = useNavigate()

  function handleClick(){
    navigate(`/my-trips/${trip.id}`)
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