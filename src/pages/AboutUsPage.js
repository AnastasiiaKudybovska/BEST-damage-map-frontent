import React from 'react';
import { Box, Container } from '@mui/material';
import SystemDescription from '../components/SystemDescription/SystemDescription';
import TeamSection from '../components/TeamSection/TeamSection';

const AboutUs = () => {
  return (
    <Box className="about-us-container">
      
  
        <SystemDescription />
        <TeamSection />
    </Box>
  );
};

export default AboutUs;