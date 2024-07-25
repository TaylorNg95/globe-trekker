import {useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function NavBar() {

    const {loggedIn, user, logout} = useContext(UserContext)

    const navigate = useNavigate()

    function handleLogout() {
        fetch('/api/logout', {
            method: 'DELETE'
        })
        .then(response => {
            logout()
            navigate('/login')
        })
         // this is not working navigate('/')
    }

    const routes = loggedIn ? <>
        <li><Link to='/'>Home</Link></li>
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