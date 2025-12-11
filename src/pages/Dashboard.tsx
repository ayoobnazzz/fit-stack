import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, LinearProgress, Container, CircularProgress, Alert } from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  LocalFireDepartment as FireIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usersAPI, workoutsAPI } from '../services/api';

interface DashboardStats {
  workoutsThisWeek: number;
  caloriesBurned: number;
  totalMinutes: number;
  currentStreak: number;
  weeklyGoalProgress: {
    workouts: { current: number; goal: number };
    calories: { current: number; goal: number };
  };
}

interface RecentWorkout {
  _id: string;
  name: string;
  date: string;
  duration: number;
  caloriesBurned?: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user stats and recent workouts in parallel
      const [, workoutsResponse] = await Promise.all([
        usersAPI.getStats(),
        workoutsAPI.getAll(),
      ]);

      const workouts = workoutsResponse.data.data || [];

      // Calculate stats
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const workoutsThisWeek = workouts.filter((w: any) => {
        const workoutDate = new Date(w.date || w.createdAt);
        return workoutDate >= weekAgo;
      }).length;

      const totalCalories = workouts.reduce((sum: number, w: any) => sum + (w.caloriesBurned || 0), 0);
      const totalMinutes = workouts.reduce((sum: number, w: any) => sum + (w.duration || 0), 0);

      // Calculate streak (simplified - consecutive days with workouts)
      let currentStreak = 0;
      const sortedWorkouts = [...workouts].sort((a: any, b: any) => {
        const dateA = new Date(a.date || a.createdAt);
        const dateB = new Date(b.date || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      if (sortedWorkouts.length > 0) {
        let checkDate = new Date();
        checkDate.setHours(0, 0, 0, 0);
        
        for (const workout of sortedWorkouts) {
          const dateValue = workout.date || workout.createdAt;
          if (!dateValue) continue;
          const workoutDate = new Date(dateValue);
          workoutDate.setHours(0, 0, 0, 0);
          
          if (workoutDate.getTime() === checkDate.getTime()) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else if (workoutDate.getTime() < checkDate.getTime()) {
            break;
          }
        }
      }

      // Get recent workouts (last 3)
      const recent = workouts
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date || a.createdAt);
          const dateB = new Date(b.date || b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 3)
        .map((w: any) => ({
          _id: w._id,
          name: w.name,
          date: formatDate(w.date || w.createdAt),
          duration: w.duration || 0,
          caloriesBurned: w.caloriesBurned,
        }));

      setStats({
        workoutsThisWeek,
        caloriesBurned: totalCalories,
        totalMinutes,
        currentStreak,
        weeklyGoalProgress: {
          workouts: { current: workoutsThisWeek, goal: 15 },
          calories: { current: totalCalories, goal: 3000 },
        },
      });

      setRecentWorkouts(recent);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const formatMinutes = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const displayStats = stats ? [
    {
      title: 'Workouts This Week',
      value: stats.workoutsThisWeek.toString(),
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
      change: stats.workoutsThisWeek > 0 ? `Keep it up!` : 'Start your first workout',
    },
    {
      title: 'Calories Burned',
      value: stats.caloriesBurned.toLocaleString(),
      icon: <FireIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #0a2540 0%, #1a4d5e 100%)',
      change: stats.caloriesBurned > 0 ? 'Great progress!' : 'Track your workouts',
    },
    {
      title: 'Total Minutes',
      value: formatMinutes(stats.totalMinutes),
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #1a4d5e 0%, #2a6d7e 100%)',
      change: stats.totalMinutes > 0 ? 'Keep going!' : 'Start exercising',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}`,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #51cbce 0%, #6dd5d8 100%)',
      change: stats.currentStreak > 0 ? 'Keep it up!' : 'Start your streak today!',
    },
  ] : [];

  const workoutsProgress = stats ? Math.round((stats.weeklyGoalProgress.workouts.current / stats.weeklyGoalProgress.workouts.goal) * 100) : 0;
  const caloriesProgress = stats ? Math.round((stats.weeklyGoalProgress.calories.current / stats.weeklyGoalProgress.calories.goal) * 100) : 0;

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
                  onClick={() => navigate('/workouts')}
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
                  onClick={() => navigate('/progress')}
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
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress sx={{ color: '#51cbce' }} />
                </Box>
              ) : stats ? (
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
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stats.workoutsThisWeek}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Workouts
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stats.caloriesBurned.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Calories
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
              {displayStats.map((stat, index) => (
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
                      <Button variant="text" size="small" onClick={() => navigate('/workouts')} sx={{ color: '#51cbce', fontWeight: 600 }}>
                        View All
                      </Button>
                    </Box>
                    {recentWorkouts.length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {recentWorkouts.map((workout) => (
                          <Box
                            key={workout._id}
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
                                  {workout.date} • {formatMinutes(workout.duration)}
                                </Typography>
                              </Box>
                              {workout.caloriesBurned && (
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#51cbce' }}>
                                    {workout.caloriesBurned}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#718096' }}>
                                    calories
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                          No workouts yet. Start your first workout!
                        </Typography>
                      </Box>
                    )}
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
                          {stats?.weeklyGoalProgress.workouts.current || 0} / {stats?.weeklyGoalProgress.workouts.goal || 15}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={workoutsProgress}
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
                          {stats?.weeklyGoalProgress.calories.current.toLocaleString() || 0} / {stats?.weeklyGoalProgress.calories.goal.toLocaleString() || 3000}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={caloriesProgress}
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
                      onClick={() => navigate('/workouts')}
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
          </>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
