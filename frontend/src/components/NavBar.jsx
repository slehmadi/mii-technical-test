import { 
    AppBar, 
    Toolbar, 
    Typography,
    Button,
    Box
} from '@mui/material';

import { Link } from 'react-router-dom'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

function NavBar() {
    const { user, logout } = useContext(AuthContext)
    const { totalItems } = useContext(CartContext)

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    E-Commerce Observability
                </Typography>

                <Box>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to='/cart'>
                        Cart ({totalItems})
                    </Button>
                    <Button color='inherit' component={Link} to='/profile'>
                        Profile
                    </Button>
                    {
                        user ? (
                            <Button color='inherit' onClick={logout}>
                                Logout
                            </Button>
                        ) : (
                            <Button 
                                color='inherit'
                                component={Link}
                                to='/login'
                            >
                                Login
                            </Button>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;