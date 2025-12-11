import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FitnessCenter as FitnessCenterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LibraryBooks as LibraryBooksIcon,
} from '@mui/icons-material';
import { exercisesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Exercise {
  _id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string;
  description: string;
}

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'HIIT'];

  useEffect(() => {
    fetchExercises();
  }, [categoryTab]);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      const category = categoryTab === 0 ? undefined : categories[categoryTab];
      const params: any = {};
      
      if (category) {
        params.category = category;
      }
      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await exercisesAPI.getAll(params);
      setExercises(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch exercises');
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== '') {
        fetchExercises();
      } else {
        fetchExercises();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    // TODO: Save favorites to backend or localStorage
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

  const filteredExercises = exercises.filter((exercise) => {
    if (searchQuery) {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    }
    return true;
  });

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
              <LibraryBooksIcon sx={{ fontSize: 32, color: '#51cbce' }} />
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
            Exercise Library
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
            Browse and discover exercises to add to your workouts. Find the perfect exercises for your fitness goals.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#718096' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid #e2e8f0',
              },
            }}
          />

          <Tabs
            value={categoryTab}
            onChange={(_, newValue) => setCategoryTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
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
            {categories.map((category) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Box>

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
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {filteredExercises.map((exercise) => (
              <Box key={exercise._id}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: '#edf2f7',
                            color: '#51cbce',
                          }}
                        >
                          <FitnessCenterIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2540' }}>
                          {exercise.name}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(exercise._id)}
                        sx={{ color: favorites.has(exercise._id) ? '#f56565' : '#a0aec0' }}
                      >
                        {favorites.has(exercise._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#718096', mb: 2, flexGrow: 1 }}>
                      {exercise.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={exercise.difficulty}
                        size="small"
                        sx={{
                          bgcolor: getDifficultyColor(exercise.difficulty),
                          color: exercise.difficulty === 'Advanced' ? 'white' : '#0a2540',
                          fontWeight: 600,
                        }}
                      />
                      <Chip label={exercise.category} size="small" variant="outlined" />
                      <Chip label={exercise.equipment} size="small" variant="outlined" />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600, mb: 0.5, display: 'block' }}>
                        Muscle Groups:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {exercise.muscleGroups.map((muscle, index) => (
                          <Chip
                            key={index}
                            label={muscle}
                            size="small"
                            sx={{
                              bgcolor: '#f7fafc',
                              color: '#4a5568',
                              fontSize: '0.7rem',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}

        {!loading && filteredExercises.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#718096', mb: 1 }}>
              No exercises found
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0aec0' }}>
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Exercises;
