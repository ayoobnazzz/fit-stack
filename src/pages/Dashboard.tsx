import { Box, Card, CardContent, Typography, Button, LinearProgress, Container } from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  LocalFireDepartment as FireIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    {
      title: 'Workouts This Week',
      value: '12',
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
      change: '+3 from last week',
    },
    {
      title: 'Calories Burned',
      value: '2,450',
      icon: <FireIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #0a2540 0%, #1a4d5e 100%)',
      change: '+15% from last week',
    },
    {
      title: 'Total Minutes',
      value: '480',
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #1a4d5e 0%, #2a6d7e 100%)',
      change: '+2 hours from last week',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #51cbce 0%, #6dd5d8 100%)',
      change: 'Keep it up!',
    },
  ];

  const recentWorkouts = [
    { name: 'Full Body Strength', date: 'Today', duration: '45 min', calories: 320 },
    { name: 'Cardio Blast', date: 'Yesterday', duration: '30 min', calories: 280 },
    { name: 'Upper Body', date: '2 days ago', duration: '40 min', calories: 250 },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 50%, #1a4d5e 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: { md: '0 0 58.333%' }, width: { xs: '100%', md: 'auto' } }}>
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
                  <FitnessCenterIcon sx={{ fontSize: 32, color: '#51cbce' }} />
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
                Your Fitness Dashboard
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
                Take control of your fitness journey. Track workouts, monitor progress, and achieve your goals with comprehensive insights and analytics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayIcon />}
                  sx={{
                    bgcolor: '#51cbce',
                    color: '#081b2e',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: '#6dd5d8',
                    },
                  }}
                >
                  Start Workout
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  View Progress →
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: { md: '0 0 41.666%' }, width: { xs: '100%', md: 'auto' } }}>
              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 3,
                  p: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Weekly Overview
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                  {stats.slice(0, 2).map((stat, index) => (
                    <Box key={index}>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid #e2e8f0',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ color: 'white' }}>{stat.icon}</Box>
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#0a2540' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#51cbce', fontWeight: 600 }}>
                    {stat.change}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: { md: '0 0 66.666%' }, width: { xs: '100%', md: 'auto' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540' }}>
                    Recent Workouts
                  </Typography>
                  <Button variant="text" size="small" sx={{ color: '#51cbce', fontWeight: 600 }}>
                    View All
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentWorkouts.map((workout, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor: '#f7fafc',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#edf2f7',
                          borderColor: '#cbd5e0',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0a2540', mb: 0.5 }}>
                            {workout.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#718096' }}>
                            {workout.date} • {workout.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#51cbce' }}>
                            {workout.calories}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#718096' }}>
                            calories
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: { md: '0 0 33.333%' }, width: { xs: '100%', md: 'auto' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mb: 3, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 3 }}>
                  Weekly Goal Progress
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                      Workouts
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a2540' }}>
                      12 / 15
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #51cbce 0%, #6dd5d8 100%)',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                      Calories
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a2540' }}>
                      2,450 / 3,000
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={82}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #51cbce 0%, #6dd5d8 100%)',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
                color: 'white',
                border: '1px solid rgba(81, 203, 206, 0.2)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Ready for a workout?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  Start a new session and track your progress
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayIcon />}
                  sx={{
                    bgcolor: '#51cbce',
                    color: '#081b2e',
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#6dd5d8',
                    },
                  }}
                >
                  Start Workout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
