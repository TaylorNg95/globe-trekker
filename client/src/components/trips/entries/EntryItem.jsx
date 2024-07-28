import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'
import EntryForm from './EntryForm'

function EntryItem({entry, trip}) {

  const {deleteEntry} = useContext(UserContext)
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      {entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}
      <button onClick={() => setEditMode(!editMode)}>Edit</button><button onClick={() => deleteEntry(entry.id)}>Delete</button>
      {editMode ? <EntryForm trip={trip} entry={entry} editMode={editMode} setEditMode={setEditMode}/> : null}
    </div>
  )
}

export default EntryItem