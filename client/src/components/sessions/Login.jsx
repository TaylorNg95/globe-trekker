import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Login() {
  const {loggedIn} = useContext(UserContext)
  console.log(loggedIn)
  
  return (
    <div>Login</div>
  )
}

export default Login