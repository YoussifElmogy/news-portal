import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Link as MuiLink,
  Divider,
  IconButton,
} from '@mui/material'
import {
  Facebook as FacebookIcon,
  X as XIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Article as ArticleIcon,
} from '@mui/icons-material'
import logo from '../assets/br-bg.png'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        background: 'linear-gradient(135deg, #660000 0%, #880000 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #660000 0%, #cc0000 50%, #660000 100%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
        <Grid container spacing={5}>
          {/* About Section */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: {xs: 'center', sm: 'flex-start'} }}>
              <Link to="/" style={{ transition: 'transform 0.3s ease' }}>
                <img 
                  src={logo} 
                  alt="logo" 
                  width={140} 
                  height={80}
                  style={{
                    filter: 'brightness(0) invert(1)',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </Link>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 800,
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: '1rem',
              }}
            >
              {t('quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink
                component={Link}
                to="/"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.938rem',
                  position: 'relative',
                  width: 'fit-content',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: 2,
                    bgcolor: 'white',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    color: 'white',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('home')}
              </MuiLink>
              <MuiLink
                component={Link}
                to="/news?category=business"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.938rem',
                  position: 'relative',
                  width: 'fit-content',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: 2,
                    bgcolor: 'white',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    color: 'white',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('business')}
              </MuiLink>
              <MuiLink
                component={Link}
                to="/news?category=entertainment"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.938rem',
                  position: 'relative',
                  width: 'fit-content',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: 2,
                    bgcolor: 'white',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    color: 'white',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('entertainment')}
              </MuiLink>
              <MuiLink
                component={Link}
                to="/news?category=sports"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.938rem',
                  position: 'relative',
                  width: 'fit-content',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: 2,
                    bgcolor: 'white',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { 
                    color: 'white',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {t('sports')}
              </MuiLink>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 800,
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: '1rem',
              }}
            >
              {t('followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderColor: 'white',
                    transform: 'translateY(-4px) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderColor: 'white',
                    transform: 'translateY(-4px) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="X"
              >
                <XIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderColor: 'white',
                    transform: 'translateY(-4px) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderColor: 'white',
                    transform: 'translateY(-4px) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
            {/* Footer Links */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
              <MuiLink
                component={Link}
                to="/contact"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  '&:hover': { 
                    color: 'white',
                    textDecoration: 'underline',
                  },
                }}
              >
                {t('contactUs')}
              </MuiLink>
              <Typography color="rgba(255, 255, 255, 0.4)" fontWeight={700}>|</Typography>
              <MuiLink
                component={Link}
                to="/about"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  '&:hover': { 
                    color: 'white',
                    textDecoration: 'underline',
                  },
                }}
              >
                {t('aboutUs')}
              </MuiLink>
              <Typography color="rgba(255, 255, 255, 0.4)" fontWeight={700}>|</Typography>
              <Typography 
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {t('advertise')}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.4)" fontWeight={700}>|</Typography>
              <Typography 
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {t('privacyNotice')}
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1 }} />

      {/* Bottom Bar */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography 
          variant="body2" 
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          {t('footerText')}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

