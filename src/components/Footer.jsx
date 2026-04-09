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
import logo from '../assets/saudi-logo.jpg'
import { useCurrentLang } from '../hooks/useCurrentLang'

const Footer = () => {
  const { t } = useTranslation()
  const currentLang = useCurrentLang()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: 'grey.900',
        color: 'white',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* About Section with Logo */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Link to={`/${currentLang}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Saudi Daily"
                  sx={{
                    height: 80,
                    width: 'auto',
                    objectFit: 'contain',
                    mb: 2,
                  }}
                />
              </Link>
              <Typography variant="body2" color="grey.400" sx={{ mb: 2, maxWidth: { xs: '100%', sm: 300 }, mx: { xs: 'auto', sm: 0 } }}>
              Your trusted source for the latest news and updates from Saudi Arabia.

              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
              {t('quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink
                component={Link}
                to={`/${currentLang}`}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                {t('home')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=business`}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                {t('business')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=entertainment`}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                {t('entertainment')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=sports`}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                {t('sports')}
              </MuiLink>
            </Box>
          </Grid>

          {/* Social Media & Contact Section */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
              {t('followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'primary.main',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-5px)',
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
                  bgcolor: 'primary.main',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-5px)',
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
                  bgcolor: 'primary.main',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-5px)',
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
                  bgcolor: 'primary.main',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-5px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
            
            {/* Footer Links */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
              <MuiLink
                component={Link}
                to={`/${currentLang}/contact`}
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Contact Us
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/about`}
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                About Us
              </MuiLink>
              <Typography 
                sx={{
                  color: 'grey.400',
                  fontSize: '0.9rem',
                }}
              >
                Advertise with us
              </Typography>
              <Typography 
                sx={{
                  color: 'grey.400',
                  fontSize: '0.9rem',
                }}
              >
                Privacy Notice
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Bottom Bar */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="body2" color="grey.500" align="center">
          © {new Date().getFullYear()} Saudi Daily. {t('footerText')}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

