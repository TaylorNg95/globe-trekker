import {useContext, useState} from 'react'
import { UserContext } from '../../../context/UserContext'
import EntryForm from './EntryForm'

// MATERIAL UI
import { Box, Button, Typography } from '@mui/material'

function EntryItem({entry, trip}) {

  const {deleteEntry} = useContext(UserContext)
  const [editMode, setEditMode] = useState(false)

  return (
    <Box>
      <Typography component='p' variant='h6'>
        {entry.date.slice(5) + '-' + entry.date.slice(0,4)} || {entry.miles} mile{entry.miles == 1.0 ? '' : 's'}  
        <Button variant='outlined' sx={{padding: 0, ml: 1, border: 'solid 1px', color: '#000000'}} onClick={() => setEditMode(!editMode)}>Edit</Button>
        <Button variant='outlined' sx={{padding: 0, ml: 1, border: 'solid 1px', color: '#000000'}} onClick={() => deleteEntry(entry.id)}>Delete</Button>
      </Typography>
      {editMode ? <EntryForm trip={trip} entry={entry} editMode={editMode} setEditMode={setEditMode}/> : null}
    </Box>
  )
}

export default EntryItem