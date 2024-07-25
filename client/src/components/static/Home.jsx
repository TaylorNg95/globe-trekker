import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Home() {

    const {loggedIn} = useContext(UserContext)
    const navigate = useNavigate()

    if (!loggedIn) {
        navigate('/login')
    } else return (
        <h1>Home: Walking the World</h1>
    )
}

export default Home