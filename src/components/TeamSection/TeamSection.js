import React from 'react';
import { Typography, Grid, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import './TeamSection.css';
const teamMembers = [
  {
    name: 'Іра Бойко',
    role: 'Team Lead / Backend Developer',
    bio: 'Відповідає за архітектуру системи та серверну частину.',
    photo: 'https://avatars.githubusercontent.com/u/1'
  },
  {
    name: 'Анастасія',
    role: 'Frontend Developer',
    bio: 'Спеціалізується на користувацькому інтерфейсі та інтерактивній візуалізації.',
    photo: 'https://avatars.githubusercontent.com/u/2'
  },
  {
    name: 'Олег',
    role: 'Data Scientist',
    bio: 'Працює з алгоритмами аналізу даних та моделями оцінки збитків.',
    photo: 'https://avatars.githubusercontent.com/u/3'
  },
  {
    name: 'Максим',
    role: 'UX/UI Designer',
    bio: 'Створює зручний інтерфейс та продумує користувацький досвід.',
    photo: 'https://avatars.githubusercontent.com/u/4'
  }
];

const TeamSection = () => {
  return (
    <>
      <Typography variant="h3" className="team-title">
        Наша команда
      </Typography>
      
      <Grid container spacing={4} className="team-grid">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box className="team-member">
              <Avatar 
                alt={member.name} 
                src={member.photo} 
                className="member-avatar"
              />
              <Typography variant="h6" className="member-name">
                {member.name}
              </Typography>
              <Typography variant="subtitle1" className="member-role">
                {member.role}
              </Typography>
              <Typography variant="body2" className="member-bio">
                {member.bio}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="back-to-map">
        <Link to="/map" className="back-link">
          Повернутися до карти
        </Link>
      </Box>
    </>
  );
};

export default TeamSection;