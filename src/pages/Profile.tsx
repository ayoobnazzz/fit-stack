import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Container,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Height as HeightIcon,
  MonitorWeight as WeightIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const userStats = [
    { label: 'Total Workouts', value: '156' },
    { label: 'Current Streak', value: '7 days' },
    { label: 'Total Calories', value: '45,230' },
    { label: 'Member Since', value: 'Jan 2024' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 50%, #1a4d5e 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'rgba(81, 203, 206, 0.2)',
                mb: 3,
              }}
            >
              <PersonIcon sx={{ fontSize: 32, color: '#51cbce' }} />
            </Box>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Profile Settings
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            Manage your account settings, personal information, and preferences to customize your fitness tracking experience.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: { md: '0 0 33.333%' }, width: { xs: '100%', md: 'auto' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 3, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: '#0a2540',
                    fontSize: '3rem',
                  }}
                >
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0a2540', mb: 0.5 }}>
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096', mb: 3 }}>
                  {user?.email || 'Fitness Enthusiast'}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    borderColor: '#e2e8f0',
                    color: '#4a5568',
                    '&:hover': {
                      borderColor: '#cbd5e0',
                      bgcolor: '#f7fafc',
                    },
                  }}
                >
                  Edit Profile Picture
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 2 }}>
                  Quick Stats
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                  {userStats.map((stat, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: '#f7fafc',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#718096' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: { md: '0 0 66.666%' }, width: { xs: '100%', md: 'auto' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 3, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 3 }}>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: { sm: '0 0 calc(50% - 8px)' }, width: { xs: '100%', sm: 'auto' } }}>
                      <TextField
                        fullWidth
                        label="First Name"
                        defaultValue={user?.user_metadata?.first_name || ''}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: { sm: '0 0 calc(50% - 8px)' }, width: { xs: '100%', sm: 'auto' } }}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue={user?.user_metadata?.last_name || ''}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: '#718096' }}>
                            <EmailIcon />
                          </Box>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: { sm: '0 0 calc(50% - 8px)' }, width: { xs: '100%', sm: 'auto' } }}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        defaultValue="1990-01-01"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: '#718096' }}>
                              <CalendarIcon />
                            </Box>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: { sm: '0 0 calc(50% - 8px)' }, width: { xs: '100%', sm: 'auto' } }}>
                      <TextField
                        fullWidth
                        label="Height (cm)"
                        type="number"
                        defaultValue="175"
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: '#718096' }}>
                              <HeightIcon />
                            </Box>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: { sm: '0 0 calc(50% - 8px)' }, width: { xs: '100%', sm: 'auto' } }}>
                      <TextField
                        fullWidth
                        label="Weight (kg)"
                        type="number"
                        defaultValue="75"
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: '#718096' }}>
                              <WeightIcon />
                            </Box>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        bgcolor: '#0a2540',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#081b2e',
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 2 }}>
                  Settings
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon sx={{ color: '#51cbce' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive notifications about your workouts"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: '#51cbce' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Updates"
                      secondary="Get weekly progress reports via email"
                    />
                    <Switch />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon sx={{ color: '#51cbce' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Privacy Mode"
                      secondary="Hide your profile from other users"
                    />
                    <Switch />
                  </ListItem>
                </List>
                <Divider sx={{ my: 2 }} />
                <Button
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: '#f56565',
                    '&:hover': {
                      bgcolor: 'rgba(245, 101, 101, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
