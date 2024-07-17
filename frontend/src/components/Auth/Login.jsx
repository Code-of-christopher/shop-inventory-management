/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import api from '../../api';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
}));

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setAuth({ user: response.data.user, token: response.data.token });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <LoginPaper elevation={3} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" mb={2}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </LoginPaper>
  );
};

export default Login;
