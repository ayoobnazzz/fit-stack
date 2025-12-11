import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: '#0a2540',
          color: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.5rem',
              }}
            >
              FitStack
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? '#51cbce' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: isActive ? 600 : 400,
                      textTransform: 'none',
                      '&:hover': {
                        color: '#51cbce',
                        bgcolor: 'rgba(81, 203, 206, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })}
              {user ? (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  sx={{
                    bgcolor: '#51cbce',
                    color: '#081b2e',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#6dd5d8',
                    },
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    bgcolor: '#51cbce',
                    color: '#081b2e',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#6dd5d8',
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>{children}</Box>
    </Box>
  );
};

export default PublicLayout;

