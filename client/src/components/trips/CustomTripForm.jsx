import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import {useFormik} from 'formik'
import * as yup from 'yup'

// MATERIAL UI
import { Typography, Box, TextField, Button } from '@mui/material'

function CustomTripForm() {
  const {addTrip} = useContext(TripContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    location: '',
    total_miles: '',
    custom: 1
  }

  const validationSchema = yup.object({
    name: yup.string().required(),
    location: yup.string().required(),
    total_miles: yup.number().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: function(values, {resetForm}){
      addTrip(values)
      resetForm()
      navigate('/my-trips')
    }
  })

  return (
    <>
      <Typography component='p' variant='h5'>Add Custom Trip</Typography>
      <Box component='form' onSubmit={formik.handleSubmit}>
        <TextField sx={{margin: 1}} label="Name" type="text" name="name" variant="outlined" value={formik.values.name} onChange={formik.handleChange} required/>
        <TextField sx={{margin: 1}} label="Location" type="text" name="location" variant="outlined" value={formik.values.location} onChange={formik.handleChange} required/>
        <TextField sx={{margin: 1}} label="Total Miles" type="number" name="total_miles" variant="outlined" inputProps={{step: '0.1', min: '0'}} value={formik.values.total_miles} onChange={formik.handleChange} required/><br />
        <Button type="submit" variant="contained" sx={{margin: 1}}>Add</Button>
      </Box>
    </>
  )
}

export default CustomTripForm