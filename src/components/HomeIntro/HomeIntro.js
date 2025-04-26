import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const damageImages = [
  'https://ichef.bbci.co.uk/news/1536/cpsprodpb/a817/live/87b50910-18ae-11f0-b1b3-7358f8d35a35.jpg.webp',
  'https://ichef.bbci.co.uk/news/1536/cpsprodpb/7e46/live/55362510-20fa-11f0-9060-674316cb3a1f.jpg.webp',
  'https://ichef.bbci.co.uk/news/1536/cpsprodpb/149EA/production/_132985448_4afa2a66-b46f-4b37-8f77-129dbf4dccc5.jpg.webp',
  'https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/vivo/live/images/2025/4/13/631b418b-5629-4c0a-95da-b802a5ffda72.jpg.webp'
];

const HomeIntro = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === damageImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '92vh', 
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      {/* Image slideshow */}
      <Box
        sx={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '40vh' : 'auto',
          backgroundImage: `url(${damageImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
        }}
      />
      
      {/* Content area */}
      <Box
        sx={{
          width: isMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
          padding: isMobile ? 4 : 6,
          color: '#ffffff',
        }}
      >
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          Missile Impact Damage Assessment System
        </Typography>

        <Typography 
          variant={isMobile ? 'h6' : 'h5'}
          paragraph 
          sx={{ 
            marginBottom: 3,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Interactive platform for analyzing missile attack consequences
        </Typography>
        
        <Button
          component={Link}
          to="/map"
          variant="contained"
          size="large"
          sx={{
            padding: '12px 36px',
            fontSize: '1rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #0057B7 0%, #FFD700 100%)',
            color: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0, 87, 183, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0047A0 0%, #E6C200 100%)',
              boxShadow: '0 6px 20px rgba(0, 87, 183, 0.4)',
            },
            transition: 'all 0.3s ease',
            marginTop: 4,
            width: isMobile ? '100%' : 'auto',
            maxWidth: '300px'
          }}
        >
          Start Analysis
        </Button>
      </Box>
    </Box>
  );
};

export default HomeIntro;