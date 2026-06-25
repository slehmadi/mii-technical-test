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

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

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

        // Dummy success
        console.log("Register success:", formData);

        // Replace with Axios later
        navigate("/login");
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
                        >
                            register
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