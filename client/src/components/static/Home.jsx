import { Container, Typography } from '@mui/material'
import React from 'react'

function Home() {
    return (   
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <Typography component='h1' variant='h3'>Walking the World</Typography>
        </Container>
    )
}

export default Home