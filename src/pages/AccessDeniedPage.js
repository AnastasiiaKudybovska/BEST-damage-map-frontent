import { Box, Typography, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AccessDeniedPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        py: 8
      }}>
        <ErrorOutlineIcon sx={{
          fontSize: 80,
          color: 'error.main',
          mb: 3
        }} />
        
        <Typography variant="h4" component="h1" sx={{
          mb: 2,
          fontWeight: 'bold',
          color: 'text.primary'
        }}>
          Access Restricted
        </Typography>
        
        <Typography variant="h6" sx={{
          mb: 3,
          color: 'text.secondary'
        }}>
          This service is currently available only in Ukraine due to regulatory requirements.
        </Typography>
        
        <Typography variant="body1" sx={{
          mb: 4,
          color: 'text.secondary'
        }}>
          If you believe this is an error or require access for official purposes, 
          please contact our support team with your credentials.
        </Typography>
      
      </Box>
    </Container>
  );
};

export default AccessDeniedPage;