import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Container,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Timer as TimerIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';

const Workouts = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const workoutTemplates = [
    {
      id: 1,
      name: 'Full Body Strength',
      duration: '45 min',
      exercises: 8,
      difficulty: 'Intermediate',
      type: 'Strength',
      color: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
    },
    {
      id: 2,
      name: 'Cardio Blast',
      duration: '30 min',
      exercises: 6,
      difficulty: 'Beginner',
      type: 'Cardio',
      color: 'linear-gradient(135deg, #0a2540 0%, #1a4d5e 100%)',
    },
    {
      id: 3,
      name: 'Upper Body Focus',
      duration: '40 min',
      exercises: 7,
      difficulty: 'Intermediate',
      type: 'Strength',
      color: 'linear-gradient(135deg, #1a4d5e 0%, #2a6d7e 100%)',
    },
    {
      id: 4,
      name: 'Lower Body Power',
      duration: '50 min',
      exercises: 9,
      difficulty: 'Advanced',
      type: 'Strength',
      color: 'linear-gradient(135deg, #51cbce 0%, #6dd5d8 100%)',
    },
    {
      id: 5,
      name: 'HIIT Session',
      duration: '25 min',
      exercises: 5,
      difficulty: 'Advanced',
      type: 'HIIT',
      color: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
    },
    {
      id: 6,
      name: 'Yoga Flow',
      duration: '60 min',
      exercises: 12,
      difficulty: 'Beginner',
      type: 'Flexibility',
      color: 'linear-gradient(135deg, #0a2540 0%, #1a4d5e 100%)',
    },
  ];

  const handleStartWorkout = () => {
    setOpenDialog(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#51cbce';
      case 'Intermediate':
        return '#6dd5d8';
      case 'Advanced':
        return '#0a2540';
      default:
        return '#718096';
    }
  };

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
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: { md: '0 0 66.666%' }, width: { xs: '100%', md: 'auto' } }}>
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
                Workout Library
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
                Choose from our curated workout plans or create your own. Track your progress and achieve your fitness goals with structured, effective routines.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
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
                Create New Workout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Workout Cards */}
      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {workoutTemplates.map((workout) => (
            <Box key={workout.id}>
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
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: 120,
                    background: workout.color,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FitnessCenterIcon sx={{ fontSize: 60, color: 'white', opacity: 0.9 }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540' }}>
                      {workout.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#718096' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#f56565' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={workout.difficulty}
                      size="small"
                      sx={{
                        bgcolor: getDifficultyColor(workout.difficulty),
                        color: workout.difficulty === 'Advanced' ? 'white' : '#0a2540',
                        fontWeight: 600,
                      }}
                    />
                    <Chip label={workout.type} size="small" variant="outlined" />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 3, mb: 2, color: '#718096' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TimerIcon fontSize="small" />
                      <Typography variant="body2">{workout.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FitnessCenterIcon fontSize="small" />
                      <Typography variant="body2">{workout.exercises} exercises</Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PlayIcon />}
                    onClick={handleStartWorkout}
                    sx={{
                      mt: 'auto',
                      borderRadius: 2,
                      py: 1.5,
                      bgcolor: '#0a2540',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#081b2e',
                      },
                    }}
                  >
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#0a2540' }}>Start Workout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2, color: '#718096' }}>
            Ready to begin? Set your target and track your progress.
          </Typography>
          <TextField
            fullWidth
            label="Target Duration (minutes)"
            type="number"
            defaultValue={45}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Notes (optional)"
            multiline
            rows={3}
            placeholder="Add any notes about this workout session..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#718096' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            sx={{
              borderRadius: 2,
              bgcolor: '#0a2540',
              color: 'white',
              '&:hover': {
                bgcolor: '#081b2e',
              },
            }}
          >
            Start Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Workouts;
