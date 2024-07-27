import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'
import EntryForm from './EntryForm'

function EntryItem({entry, trip}) {

  const {deleteEntry} = useContext(UserContext)
  const [editMode, setEditMode] = useState(false)

  function handleEdit(id) {
    setEditMode(!editMode)
    console.log('handling edit')
  }

  return (
    <div>
      {entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}
      <button onClick={() => handleEdit(entry.id)}>Edit</button><button onClick={() => deleteEntry(entry.id)}>Delete</button>
      {editMode ? <EntryForm trip={trip} editMode={editMode}/> : null}
    </div>
  )
}

export default EntryItem