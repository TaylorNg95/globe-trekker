import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Signup() {

  const {login} = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    username: '',
    password: ''
  }

  const validationSchema = yup.object({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async function(values, {resetForm}) {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.status == 201){
        const user = await response.json()
        login(user)
        resetForm()
        navigate('/')
      } else {
        const error = await response.json()
        console.log(error)
      }
    }
  })

  return (
    <>
        <h1>Sign Up Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <label>Name: <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange}/></label><br />
            <label>Username: <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange}/></label><br />
            <label>Password: <input type='password' name='password' autoComplete='on' value={formik.values.password} onChange={formik.handleChange}/></label><br />
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Signup