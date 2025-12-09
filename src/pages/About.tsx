import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  Flag as FlagIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: 'Our Mission',
      description: 'To empower individuals to achieve their fitness goals through innovative tracking tools and comprehensive analytics.',
    },
    {
      icon: <FlagIcon sx={{ fontSize: 40 }} />,
      title: 'Our Vision',
      description: 'To become the leading fitness tracking platform that helps millions of people lead healthier, more active lives.',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Our Values',
      description: 'We believe in accessibility, data-driven decisions, and continuous improvement to serve our community better.',
    },
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
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              textAlign: 'center',
            }}
          >
            About FitStack
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            We're dedicated to helping you achieve your fitness goals through innovative technology and comprehensive tracking.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, px: 3 }}>
        {/* Story Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0a2540', mb: 3 }}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', lineHeight: 1.8, mb: 3, fontSize: '1.1rem' }}>
            FitStack was born from a simple idea: fitness tracking should be accessible, intuitive, and powerful. 
            We noticed that existing solutions were either too complex or lacked the features needed for serious fitness enthusiasts.
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Our platform combines comprehensive workout tracking, detailed progress analytics, and an extensive exercise library 
            to provide everything you need in one place. Whether you're a beginner starting your fitness journey or an experienced 
            athlete looking to optimize your training, FitStack is designed to grow with you.
          </Typography>
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0a2540', mb: 4, textAlign: 'center' }}>
            What We Stand For
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {values.map((value, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: '#edf2f7',
                      color: '#51cbce',
                      mb: 3,
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0a2540', mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', lineHeight: 1.6 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Team Section */}
        <Box
          sx={{
            p: 6,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #081b2e 0%, #0a2540 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Join Our Community
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Thousands of users trust FitStack to track their fitness journey. Start yours today!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;

