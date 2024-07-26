import {useContext} from 'react'
import { TripContext } from '../../context/TripContext'
import TripCard from './TripCard'

function TripMenuPage() {
  const {trips} = useContext(TripContext)

  return (
    <div>TripMenuPage</div>
  )
}

export default TripMenuPage