import {useState} from 'react'

function Signup() {

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
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    setFormData(initialFormData)
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