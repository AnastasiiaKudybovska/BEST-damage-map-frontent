import { Box, Typography, Link, Container } from '@mui/material';
import { Facebook, Instagram, Telegram, Email } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" sx={{
      backgroundColor: 'var(--main-bg-color)',
      py: 4,
      mt: 'auto',
      color: 'white',
      fontFamily: '"Montserrat", sans-serif',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3
        }}>
          {/* Company Info */}
          <Box sx={{ 
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 2, md: 0 }
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              mb: 1,
              fontSize: '1.25rem'
            }}>
              WAR DAMAGE ASSESSMENT PLATFORM
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Advanced analytics for missile impact evaluation
            </Typography>
            <Typography variant="caption" sx={{ 
              display: 'block',
              mt: 1,
              opacity: 0.6
            }}>
              © {new Date().getFullYear()} All rights reserved
            </Typography>
          </Box>

          {/* Social Links */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-end' }
          }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 600,
              mb: 1.5,
              fontSize: '0.875rem'
            }}>
              CONNECT WITH US
            </Typography>
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              justifyContent: 'center'
            }}>
              <Link href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
                <Facebook sx={{ 
                  color: 'white', 
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#4267B2',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                <Instagram sx={{ 
                  color: 'white',
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#E1306C',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
              <Link href="https://t.me" target="_blank" rel="noopener" aria-label="Telegram">
                <Telegram sx={{ 
                  color: 'white',
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#0088CC',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
              <Link href="mailto:contact@damagemap.com" target="_blank" rel="noopener" aria-label="Email">
                <Email sx={{ 
                  color: 'white',
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#D44638',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
              <Link href="https://github.com/maximka608/We_love_BEST_hackathon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon sx={{ 
                  color: 'white',
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#6e5494',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon sx={{ 
                  color: 'white',
                  fontSize: '1.5rem',
                  '&:hover': { 
                    color: '#0077B5',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;