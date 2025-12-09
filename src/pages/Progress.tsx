import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  LinearProgress,
  Container,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  FitnessCenter as FitnessCenterIcon,
  LocalFireDepartment as FireIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Progress = () => {
  const [tabValue, setTabValue] = useState(0);

  const weeklyData = [
    { day: 'Mon', workouts: 2, calories: 450 },
    { day: 'Tue', workouts: 1, calories: 320 },
    { day: 'Wed', workouts: 3, calories: 680 },
    { day: 'Thu', workouts: 2, calories: 480 },
    { day: 'Fri', workouts: 1, calories: 350 },
    { day: 'Sat', workouts: 2, calories: 420 },
    { day: 'Sun', workouts: 1, calories: 280 },
  ];

  const monthlyStats = [
    { label: 'Total Workouts', value: '48', change: '+12%', icon: <FitnessCenterIcon /> },
    { label: 'Total Calories', value: '12,450', change: '+8%', icon: <FireIcon /> },
    { label: 'Avg Duration', value: '42 min', change: '+5%', icon: <TimelineIcon /> },
    { label: 'Consistency', value: '85%', change: '+10%', icon: <TrendingUpIcon /> },
  ];

  const achievements = [
    { title: 'Week Warrior', description: '7 day workout streak', unlocked: true, date: '2 days ago' },
    { title: 'Calorie Crusher', description: 'Burned 10,000 calories', unlocked: true, date: '1 week ago' },
    { title: 'Early Bird', description: '5 morning workouts', unlocked: false },
    { title: 'Strength Master', description: '50 strength workouts', unlocked: false },
  ];

  const maxWorkouts = Math.max(...weeklyData.map((d) => d.workouts));

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
              <TrendingUpIcon sx={{ fontSize: 32, color: '#51cbce' }} />
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
            Track Your Progress
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
            Monitor your fitness journey with comprehensive analytics and insights. See how far you've come and stay motivated to reach your goals.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#718096',
              '&.Mui-selected': {
                color: '#0a2540',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#51cbce',
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Weekly" />
          <Tab label="Monthly" />
          <Tab label="Achievements" />
        </Tabs>

        {tabValue === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              {monthlyStats.map((stat, index) => (
                <Box key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: '#edf2f7',
                          color: '#51cbce',
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0a2540' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#51cbce', fontWeight: 600 }}>
                      {stat.change} from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
            </Box>

            <Box sx={{ width: '100%' }}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 3 }}>
                    Weekly Activity
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 200 }}>
                    {weeklyData.map((data, index) => (
                      <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: '100%',
                            borderRadius: '8px 8px 0 0',
                            position: 'relative',
                            height: `${(data.workouts / maxWorkouts) * 150}px`,
                            minHeight: '20px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            background: 'linear-gradient(to top, #0a2540 0%, #51cbce 100%)',
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                            {data.workouts}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ mt: 1, color: '#718096', fontWeight: 600 }}>
                          {data.day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Box sx={{ width: '100%' }}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 3 }}>
                    This Week's Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {weeklyData.map((data, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#0a2540' }}>
                            {data.day}
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#718096' }}>
                            {data.workouts} workouts • {data.calories} cal
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(data.workouts / maxWorkouts) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#e2e8f0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: 'linear-gradient(90deg, #0a2540 0%, #51cbce 100%)',
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {monthlyStats.map((stat, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: '#edf2f7',
                          color: '#51cbce',
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0a2540' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#51cbce', fontWeight: 600 }}>
                      {stat.change} from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}

        {tabValue === 3 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {achievements.map((achievement, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    opacity: achievement.unlocked ? 1 : 0.6,
                    border: achievement.unlocked ? '2px solid #51cbce' : '2px solid #e2e8f0',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: achievement.unlocked ? 'rgba(81, 203, 206, 0.1)' : '#e2e8f0',
                          color: achievement.unlocked ? '#51cbce' : '#a0aec0',
                        }}
                      >
                        <TrendingUpIcon />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540', mb: 0.5 }}>
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
                          {achievement.description}
                        </Typography>
                        {achievement.unlocked && (
                          <Typography variant="caption" sx={{ color: '#51cbce', fontWeight: 600 }}>
                            Unlocked {achievement.date}
                          </Typography>
                        )}
                        {!achievement.unlocked && (
                          <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600 }}>
                            Locked
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Progress;
