import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Login() {

  const {login} = useContext(UserContext)
  const navigate = useNavigate()

  const initialFormData = {
    username: '',
    password: ''
  }
  
  const [formData, setFormData] = useState(initialFormData)

  function handleChange(e){
    const new_key = e.target.name
    const new_value = e.target.value
    setFormData({
        ...formData, [new_key]: new_value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.status == 201) {
            return response.json()
        } else if (response.status == 422) {
            return response.json().then(error => {
                return Promise.reject(error)
            })
        }
    })
    .then(user => {
        login(user)
        navigate('/')
    })
    setFormData(initialFormData)
  }

  return (
    <>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
            <label>Username: <input type='text' name='username' value={formData.username} onChange={handleChange}/></label><br />
            <label>Password: <input type='password' name='password' value={formData.password} onChange={handleChange}/></label><br />
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Login