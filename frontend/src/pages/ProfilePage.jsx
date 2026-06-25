import { Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ProfilePage() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Typography variant='h4'>Profile</Typography>
            <Typography>Username: {user?.username}</Typography>
        </>
    )
}

export default ProfilePage;