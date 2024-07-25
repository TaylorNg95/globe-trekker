import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <>
            <h1>In Nav Bar</h1>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
                <li><Link to='/'>Home</Link></li>
            </ul>
        </>
    )
}

export default NavBar