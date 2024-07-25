import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'

function NewEntryForm({trip, entries, setEntries}) {
  console.log(trip)
  const {user} = useContext(UserContext)

  const initialFormData = {
    date: '',
    miles: ''
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
    fetch(`/api/users/${user.id}/trips/${trip.id}/entries`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.status == 201) {
            return response.json()
        } else if (response.status == 422) {
            return response.json().then(error => {
                return Promise.reject(error)
            })
        }
    })
    .then(entry => {
      setEntries([...entries, entry])
      setFormData(initialFormData)
    })
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