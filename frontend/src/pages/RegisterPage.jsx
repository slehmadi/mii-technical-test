import { 
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    Stack,
    Alert,
    Link
} from '@mui/material'

import { useState } from 'react';
import { useNavigate, Link as RouterLink, Router } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        // Validation pass
        if (formData.password !== formData.confirmPassword) {
            setError("Password didn't match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (!formData.email.includes('@')) {
            setError("Invalid email address");
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Paper sx={{ p: 4, mt: 6 }}>
                <Typography variant='h4' gutterBottom>
                    Register
                </Typography>
                {
                    error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )
                }
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField 
                            label='Username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField 
                            label='Email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField 
                            label='Password'
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label='Confirm Password'
                            name='confirmPassword'
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <Typography align='center'>
                            Already have an Account?

                            {" "}

                            <Link component={RouterLink} to="/login">
                                login here
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default RegisterPage;