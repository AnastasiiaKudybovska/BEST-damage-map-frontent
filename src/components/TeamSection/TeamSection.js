import React from 'react';
import { Typography, Box, Avatar, Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import './TeamSection.css';

const teamMembers = [
  {
    name: 'Iryna Boiko',
    role: 'Team Lead / Backend',
    image: 'https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looks-sad-1593184781.jpg?crop=0.5625812039844088xw:1xh;center,top&resize=980:*',
    linkedin: 'https://www.linkedin.com'
  },
  {
    name: 'Anastasiia Kudybovska',
    role: 'Fullstack Developer',
    image: 'https://i.pinimg.com/236x/8d/56/b1/8d56b1e4965d52d6093672b13813a11c.jpg',
  },
  {
    name: 'Oleh Lozovyi',
    role: 'Fullstack Developer',
    image: 'https://i.pinimg.com/736x/d2/5b/a6/d25ba623a3c9292612bb8a0422c2c816.jpg'
  },
  {
    name: 'Maksym Bigus',
    role: 'ML Engineer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKK1zSX_YjOvNSHlqwuy84X_WMWRSHNigzpA&s'
  }
];

const TeamSection = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box className="team-container">
      <Typography variant="h3" component="h1"  gutterBottom  sx={{
          fontWeight: 'bold',
          color: 'var(--main-text-color)',
          marginBottom: 2,
          textAlign: 'center',
        }}>
        Our Team
      </Typography> 
      
      <Box className="team-cards-container">
        {teamMembers.map((member, index) => (
          <Box key={index} className="member-card">
            <Box className="avatar-container">
              <Avatar 
                alt={member.name} 
                src={member.image}
                className="member-avatar"
              />
            </Box>
            <Typography variant="h6" className="member-name">
              {member.name}
            </Typography>
            <Typography variant="body1" className="member-role">
              {member.role}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className="back-button-container">
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
          Back to Map
        </Button>
      </Box>
    </Box>
  );
};

export default TeamSection;