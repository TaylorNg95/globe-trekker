import React from 'react'

function EntryCard({entry}) {

  function handleClick() {
    console.log('handling click')
  }

  return (
    <div>
      {entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}
      <button onClick={handleClick}>Edit</button><button>Delete</button>
    </div>
  )
}

export default EntryCard