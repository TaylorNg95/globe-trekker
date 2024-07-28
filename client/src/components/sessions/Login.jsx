import {useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Login() {
  const [error, setError] = useState('')

  const {login} = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async function(values) {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.status == 200){
        const user = await response.json()
        login(user)
        navigate('/')
      } else {
        const error = await response.json()
        setError(error.error)
      }
    }
  })

  return (
    <>
        <h1>Login Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <label>Username: <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange}/></label><br />
            <label>Password: <input type='password' name='password' autoComplete='on' value={formik.values.password} onChange={formik.handleChange}/></label><br />
            {error ? <p style={{color: 'red'}}>{error}</p> : null}
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Login