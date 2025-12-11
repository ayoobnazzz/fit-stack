import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 50 }} />,
      title: 'Track Workouts',
      description: 'Log your exercises, sets, and reps with ease. Build custom workout plans tailored to your goals.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
      title: 'Monitor Progress',
      description: 'Visualize your fitness journey with detailed analytics and progress charts.',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 50 }} />,
      title: 'Exercise Library',
      description: 'Access a comprehensive library of exercises with detailed instructions and muscle group targeting.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 50%, #1a4d5e 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(81, 203, 206, 0.2)',
                mb: 4,
              }}
            >
              <FitnessCenterIcon sx={{ fontSize: 48, color: '#51cbce' }} />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Transform Your Fitness Journey
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                lineHeight: 1.6,
              }}
            >
              Track workouts, monitor progress, and achieve your fitness goals with FitStack - your all-in-one fitness companion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/login"
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
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#6dd5d8',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#0a2540', mb: 2 }}>
            Why Choose FitStack?
          </Typography>
          <Typography variant="h6" sx={{ color: '#718096', maxWidth: '600px', mx: 'auto' }}>
            Everything you need to achieve your fitness goals in one powerful platform
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#edf2f7',
                    color: '#51cbce',
                    mb: 3,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0a2540', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#718096', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 8,
            textAlign: 'center',
            p: 6,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Start Your Fitness Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users achieving their fitness goals with FitStack
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#51cbce',
              color: '#081b2e',
              fontWeight: 600,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#6dd5d8',
              },
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

