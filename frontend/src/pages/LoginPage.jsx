import { 
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Link
} from '@mui/material';

import { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // dummy

        login({
            id: 1,
            username: username
        });

        navigate('/');
    };

    return (
        <Container maxWidth='sm'>
            <Paper sx={{ p:4, mt: 8}}>
                <Typography variant='h4' gutterBottom>Login</Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField 
                            label='username'
                            value={username}
                            onChange={(e) => 
                                setUsername(e.target.value)
                            }
                            required
                        />

                        <TextField 
                            label='password'
                            type='password'
                            value={password}
                            onChange={(e) => 
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <Button type='submit' variant='contained'>Login</Button>
                        <Typography align='center'>
                            Don't have an Account?
                            {" "}
                            <Link component={RouterLink} to='/register'>
                                Register Here
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default LoginPage;