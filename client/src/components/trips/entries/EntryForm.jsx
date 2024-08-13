import {useContext} from 'react'
import { UserContext } from '../../../context/UserContext'
import {useFormik} from 'formik'
import * as yup from 'yup'

// MATERIAL UI
import { Box, TextField, Button } from '@mui/material'

function EntryForm({trip, entry, editMode, setEditMode}) {
  const {user, addEntry, editEntry} = useContext(UserContext)

  const initialValues = {
    date: '',
    miles: '',
    user_id: user.id,
    trip_id: trip.id
  }

  const validationSchema = yup.object({
    date: yup.string().matches(/\d{4}-\d{2}-\d{2}/, 'Invalid date').required(),
    miles: yup.number().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: function(values, {resetForm}) {
      if (editMode) {
        editEntry(values, entry.id)
        setEditMode(!editMode)
        resetForm()
      } else {
        addEntry(values)
        resetForm()
      }
    }
  })

  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <TextField sx={{mr: 1, ml: 1, mt: 1}} type='date' name="date" variant="outlined" value={formik.values.date} onChange={formik.handleChange} required/>
      <TextField sx={{mr: 1, ml: 1, mt: 1}} type="number" label="Miles" name="miles" variant="outlined" inputProps={{step: '0.1', min: '0'}} value={formik.values.miles} onChange={formik.handleChange} required/>
      <Button variant='contained' sx={{padding: 0, ml: 1, mt: 1}} type='submit' >{editMode ? 'Edit Entry' : 'Add Entry'}</Button>
    </Box>
  )
}

export default EntryForm