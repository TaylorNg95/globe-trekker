import {useContext} from 'react'
import { EntryContext } from '../../../context/EntryContext'

function EntryCard({entry}) {

  const {entries, setEntries} = useContext(EntryContext)

  function handleEdit() {
    console.log('handling edit')
  }

  function handleDelete() {
    fetch(`/api/entries/${entry.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      setEntries(entries.filter(ent => ent.id != entry.id))
    })
  }

  return (
    <div>
      {entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}
      <button onClick={handleEdit}>Edit</button><button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default EntryCard