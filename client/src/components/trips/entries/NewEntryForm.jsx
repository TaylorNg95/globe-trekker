import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'

function NewEntryForm({trip}) {
  const {user, addEntry} = useContext(UserContext)

  const initialFormData = {
    date: '',
    miles: '',
    user_id: user.id,
    trip_id: trip.id
  }
  
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
    addEntry(formData)
    setFormData(initialFormData)
  }

  return (
    <>
      <div>NewEntryForm</div>
      <form onSubmit={handleSubmit}>
      <label>Date (mm-dd-yy): <input type='string' name='date' value={formData.date} onChange={handleChange}/></label><br />
      <label>Miles: <input type='number' step='0.1' name='miles' value={formData.miles} onChange={handleChange}/></label><br />
      <input type='submit' value='Add New Entry'/>
      </form>
    </>
  )
}

export default NewEntryForm