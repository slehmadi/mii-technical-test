import { 
    AppBar, 
    Toolbar, 
    Typography,
    Button,
    Box
} from '@mui/material';

import { Link } from 'react-router-dom'

function NavBar() {
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
                        Cart
                    </Button>
                    <Button color='inherit' component={Link} to='/profile'>
                        Profile
                    </Button>
                    <Button color='inherit' component={Link} to='/login'>
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;