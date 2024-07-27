import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import {useFormik} from 'formik'
import * as yup from 'yup'

function CustomTripForm() {
  const {addTrip} = useContext(TripContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    country: '',
    total_miles: '',
    custom: 1
  }

  const validationSchema = yup.object({

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
      <div>CustomTripForm</div>
      <form onSubmit={formik.handleSubmit}>
      <label>Name: <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange}/></label><br />
      <label>Country: <input type='text' name='country' value={formik.values.country} onChange={formik.handleChange}/></label><br />
      <label>Total Miles: <input type='number' name='total_miles' value={formik.values.total_miles} onChange={formik.handleChange}/></label><br />
      <input type='submit' value='Add Custom Trip'/>
      </form>
    </>
  )
}

export default CustomTripForm