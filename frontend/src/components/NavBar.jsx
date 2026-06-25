import { AppBar, Toolbar, Typography } from '@mui/material';

function NavBar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography>
                    E-Commerce Observability
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;