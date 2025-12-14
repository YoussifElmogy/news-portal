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

const Footer = () => {
  const { t } = useTranslation()

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
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ArticleIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h6" fontWeight="bold">
                {t('news')}
              </Typography>
            </Box>
            {/* <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" paragraph>
              {t('footerDescription')}
            </Typography> */}
            
            {/* Social Media Icons */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {t('followUs')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
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
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t('quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/"
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
                to="/news?category=business"
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
                to="/news?category=entertainment"
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
                to="/news?category=sports"
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

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t('company')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            
              <MuiLink
                component={Link}
                to="/contact"
                sx={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': { color: 'grey.300' }
                }}
              >
                {t('contactUs')}
              </MuiLink>
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

