import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'

function EntryForm({trip, entry, editMode, setEditMode}) {
  const {user, addEntry, editEntry} = useContext(UserContext)

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
    if (editMode) {
      editEntry(formData, entry.id)
      setEditMode(!editMode)
    } else {
      addEntry(formData)
    }
    setFormData(initialFormData)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder='Date (mm-dd-yy)' type='text' name='date' value={formData.date} onChange={handleChange}/>
        <input placeholder='Miles' type='number' step='0.1' name='miles' value={formData.miles} onChange={handleChange}/><br />
        <input type='submit' value={editMode ? 'Edit Entry' : 'Add Entry'}/>
      </form>
    </>
  )
}

export default EntryForm