import {useContext} from 'react'
import { EntryContext } from '../../../context/EntryContext'

function EntryCard({entry}) {

  const {deleteEntry} = useContext(EntryContext)

  function handleEdit() {
    console.log('handling edit')
  }

  return (
    <div>
      {entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}
      <button onClick={handleEdit}>Edit</button><button onClick={() => deleteEntry(entry.id)}>Delete</button>
    </div>
  )
}

export default EntryCard