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
import { useCurrentLang } from '../hooks/useCurrentLang'

const Footer = () => {
  const { t } = useTranslation()
  const currentLang = useCurrentLang()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: {xs: 'center', sm: 'flex-start'} }}>
              <Link to={`/${currentLang}`}>
              <img src={logo} alt="logo" width={200} height={150}  />
              </Link>
            </Box>
            
        
          </Grid>

          {/* Quick Links */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t('quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to={`/${currentLang}`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' }
                }}
              >
                {t('home')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=business`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' }
                }}
              >
                {t('business')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=entertainment`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' }
                }}
              >
                {t('entertainment')}
              </MuiLink>
              <MuiLink
                component={Link}
                to={`/${currentLang}/news?category=sports`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' }
                }}
              >
                {t('sports')}
              </MuiLink>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item size={{xs: 12, sm: 6, md: 4}} >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              {t('followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton 
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
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
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
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
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
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
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
                {/* Footer Links */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 3 }}>
              <MuiLink
                component={Link}
                to={`/${currentLang}/contact`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' },
                  fontSize: '0.95rem',
                }}
              >
                {/* {t('contactUs')} */}
                Contact Us
              </MuiLink>
              <Typography color="rgba(255, 255, 255, 0.5)">|</Typography>
              <MuiLink
                component={Link}
                to={`/${currentLang}/about`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' },
                  fontSize: '0.95rem',
                }}
              >
                {/* {t('aboutUs')} */}
                About Us
              </MuiLink>
              <Typography color="rgba(255, 255, 255, 0.5)">|</Typography>
              <Typography 
                sx={{
                  color: '#fff',
                  fontSize: '0.95rem',
                }}
              >
                {/* {t('advertise')} */}
                Advertise with us
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.5)">|</Typography>
              <Typography 
                sx={{
                  color: '#fff',
                  fontSize: '0.95rem',
                }}
              >
                {/* {t('privacyNotice')} */}
                Privacy Notice
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      {/* Bottom Bar */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" align="center">
          {t('footerText')}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

