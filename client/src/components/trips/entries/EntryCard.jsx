import React from 'react'

function EntryCard({entry}) {
  return (
    <p>{entry.date} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}</p>
  )
}

export default EntryCard