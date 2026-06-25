import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/NavBar';

function MainLayout() {
    return(
        <>
            <NavBar />

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default MainLayout;