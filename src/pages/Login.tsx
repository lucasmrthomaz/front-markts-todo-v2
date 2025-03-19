import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  CssBaseline
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Markts client-side or backend login logic here
    navigate('/todo');
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 flex items-center">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper elevation={8} className="p-8 flex flex-col items-center rounded-2xl">
          <Box className="mb-6 text-primary">
            <span className="text-6xl">
              <img
              src="https://markts.com.br/wp-content/uploads/2024/09/Logo.png" 
              alt="Markts Logo"
              aria-label='Markts Logo' 
              className="w-100"
              />
            </span>
          </Box>

          <Typography component="h1" variant="h5" className="mb-2">
            Lista de Mercado Markts
          </Typography>
          <Typography color="text.secondary" className="mb-8">
            Faça login para acessar sua lista de mercado
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="w-full">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                ),
              }}
              className="mb-4"
              aria-label="Usuário"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Lock className="w-5 h-5 mr-2 text-gray-600" />
                ),
              }}
              className="mb-4"
              aria-label='Senha'
            />

            <Box className="flex justify-between items-center my-4">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar acesso"
                className="text-gray-700"
                aria-label="Lembrar acesso"
              />
              <Link 
                href="#" 
                variant="body2" 
                className="text-indigo-600 hover:text-indigo-700"
                aria-label="Esqueceu a senha?"
              >
                Esqueceu a senha?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-4 mb-6 py-3 bg-orange-500 hover:bg-orange-600"
            >
              ENTRAR
            </Button>

            <Box className="text-center">
              <Typography variant="body2" color="text.secondary" className="inline">
                Ainda não tem conta?{' '}
              </Typography>
              <Link 
                href="#" 
                variant="body2" 
                className="text-indigo-600 hover:text-indigo-700"
                aria-label="Entre em contato conosco"
              >
                <br/> Entre em contato conosco
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;