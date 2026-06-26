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
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthProvider';

import authService from '../services/authService';

function LoginPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            setLoading(true)
            const userData = await authService.login({
                username, password
            })
            
            login(userData);

            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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

                        <Button 
                            type='submit' 
                            variant='contained'
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
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