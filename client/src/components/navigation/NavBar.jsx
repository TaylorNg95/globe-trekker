import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

// MATERIAL UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function NavBar() {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {loggedIn ? <>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to='/' onClick={handleClose}>Home</MenuItem>
                        <MenuItem component={Link} to='/my-trips' onClick={handleClose}>My Trips</MenuItem>
                    </Menu>
                    <Typography variant="h6" color="inherit" component={Link} to='/' sx={{ flexGrow: 1, textDecoration: 'none' }}>
                        GlobeTrekker
                    </Typography>
                </> : null}
                {loggedIn ?
                    <Button component={Link} to='#' color="inherit" onClick={handleLogout}>Logout</Button> :
                    <>
                        <Button component={Link} to='/login' color="inherit">Log In</Button>
                        <Button component={Link} to='/signup' color="inherit">Signup</Button>
                    </>
                }
                </Toolbar>
            </AppBar>
        </Box> 
    )
}

export default NavBar