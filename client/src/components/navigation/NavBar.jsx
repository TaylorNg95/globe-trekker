import {useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    console.log('NavBar component')

    const {loggedIn, logout, user} = useContext(UserContext)

    const navigate = useNavigate()

    async function handleLogout() {
        await fetch('/api/logout', {
            method: 'DELETE'
        })
        logout()
        navigate('/login')
    }

    const routes = loggedIn ? <>
        <p>Welcome, {user.name}!</p>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/my-trips'>My Trips</Link></li>
        <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
    </> : <>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
    </>

    return (
        <>
            <ul>
                {routes}    
            </ul>
        </>
    )
}

export default NavBar