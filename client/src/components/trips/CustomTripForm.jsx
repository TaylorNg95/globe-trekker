import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { TripContext } from '../../context/TripContext'

function CustomTripForm() {
  const {user, addEntry} = useContext(UserContext)
  const {addTrip} = useContext(TripContext)

  const navigate = useNavigate()

  const initialFormData = {
    name: '',
    country: '',
    total_miles: '',
    custom: 1
  }

  // Add the custom trip; get the trip id as a response
  // Create a 0 entry based on that trip ID
  
  const [formData, setFormData] = useState(initialFormData)

  function handleChange(e){
    const new_key = e.target.name
    const new_value = e.target.value
    setFormData({
        ...formData, [new_key]: new_value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    addTrip(formData)
    navigate('/my-trips')
    setFormData(initialFormData)
  }

  return (
    <>
      <div>CustomTripForm</div>
      <form onSubmit={handleSubmit}>
      <label>Name: <input type='text' name='name' value={formData.name} onChange={handleChange}/></label><br />
      <label>Country: <input type='text' name='country' value={formData.country} onChange={handleChange}/></label><br />
      <label>Total Miles: <input type='number' name='total_miles' value={formData.total_miles} onChange={handleChange}/></label><br />
      <input type='submit' value='Add Custom Trip'/>
      </form>
    </>
  )
}

export default CustomTripForm