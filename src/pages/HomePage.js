
import DamageMap from '../components/DamageMap/DamageMap';
import HomeIntro from '../components/HomeIntro/HomeIntro';
import { Box, Typography, Container, Paper, Grid, IconButton, Collapse, Button } from '@mui/material';
const HomePage = () => {
  

  return (
    <Container maxWidth="xl" sx={{ 
      mt: 8, mb: 2, px: 0, pr: "0 !important", pl: "0 !important", mr: 0, ml: 0, width: '100%',  maxWidth: 'none !important', overflowX: 'hidden'
    }}
  >     <HomeIntro/>
        <DamageMap/>
  </Container>

  );
};

export default HomePage;