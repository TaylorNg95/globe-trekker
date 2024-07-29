import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {Link} from 'react-router-dom'
import './Home.css'

// MATERIAL UI
import { Container, Typography, Button } from '@mui/material'

function Home() {
    const {user} = useContext(UserContext)

    return (
        <Container id='welcome' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
            <Typography component='h1' variant='h3'>{user ? `Welcome, ${user.name}!` : 'Walking the World'}</Typography>
            <img id='boots' src='/images/boots.png'></img>
            {user ?
                <Button component={Link} to='/my-trips' variant='contained' sx={{mt: 3}}>View My Trips</Button> :
                <Button component={Link} to='/login' variant='contained' sx={{mt: 3}}>Login</Button>}
        </Container>
    )
}

export default Home