import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

// MATERIAL UI
import { Container, Typography, Box, TextField, Button } from '@mui/material'

function Signup() {
  const [error, setError] = useState('')

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
        setError(error.error)
      }
    }
  })

  return (
      <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
        <Typography component='h1' variant='h3' sx={{fontWeight: 'bold'}}>Sign Up</Typography>
        <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField sx={{mt: 2}} label="Name" name="name" variant="outlined" value={formik.values.name} onChange={formik.handleChange} required/><br />
            <TextField sx={{mt: 1}} label="Username" name="username" variant="outlined" value={formik.values.username} onChange={formik.handleChange} required/><br />
            <TextField sx={{mt: 1, mb: 1}} label="Password" type="password" name="password" variant="outlined" value={formik.values.password} autoComplete="on" onChange={formik.handleChange} required/><br />
            {error ? <p style={{color: 'red'}}>{error}</p> : null}
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    </Container>
  )
}

export default Signup