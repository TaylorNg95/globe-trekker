import {useContext, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { UserContext } from '../../../context/UserContext'

function EntryForm({trip, entry, editMode, setEditMode}) {
  const {user, addEntry, editEntry} = useContext(UserContext)

  const initialValues = {
    date: '',
    miles: '',
    user_id: user.id,
    trip_id: trip.id
  }

  const validationSchema = yup.object({
    date: yup.string().matches(/\d{2}-\d{2}-\d{2}/, 'Invalid date').required(),
    miles: yup.number().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
      if (editMode) {
        editEntry(values, entry.id)
        setEditMode(!editMode)
      } else {
        addEntry(values)
      }
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input placeholder='Date (mm-dd-yy)' type='text' name='date' value={formik.values.date} onChange={formik.handleChange}/>
        <input placeholder='Miles' type='number' step='0.1' name='miles' value={formik.values.miles} onChange={formik.handleChange}/><br />
        <input type='submit' value={editMode ? 'Edit Entry' : 'Add Entry'}/>
      </form>
    </>
  )
}

export default EntryForm