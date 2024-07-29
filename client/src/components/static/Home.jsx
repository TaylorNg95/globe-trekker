import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {Link} from 'react-router-dom'

// MATERIAL UI
import { Container, Typography, Button } from '@mui/material'

function Home() {
    const {user} = useContext(UserContext)

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
            <Typography component='h1' variant='h3'>{user ? `Welcome, ${user.name}!` : 'Walking the World'}</Typography>
            {user ? <Button component={Link} to='/my-trips' variant='contained' sx={{mt: 2}}>View My Trips</Button> : null}
        </Container>
    )
}

export default Home