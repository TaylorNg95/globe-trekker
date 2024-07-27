import {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const {login} = useContext(UserContext)
  const navigate = useNavigate()

  const initialFormData = {
    name: '',
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
    async function signupUser() {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.status == 200){
        const user = await response.json()
        login(user)
        navigate('/')
      } else {
        console.log('Oops something went wrong')
      }
      setFormData(initialFormData)
    }
    signupUser()
  }

  return (
    <>
        <h1>Sign Up Form</h1>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type='text' name='name' value={formData.name} onChange={handleChange}/></label><br />
            <label>Username: <input type='text' name='username' value={formData.username} onChange={handleChange}/></label><br />
            <label>Password: <input type='password' name='password' value={formData.password} onChange={handleChange}/></label><br />
            <input type='submit' value='Submit'/>
        </form>
    </>
  )
}

export default Signup