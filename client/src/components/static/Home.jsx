import {useContext} from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <h1>Home: Walking the World</h1>
            <Link to='/my-trips'>View Dashboard</Link>
        </>
    )
}

export default Home