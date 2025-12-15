import { useTranslation } from 'react-i18next'
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          elevation={2}
          sx={{
            p: 6,
            mb: 6,
            bgcolor: 'primary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {/* {t('aboutUs')} */}
            About Us
          </Typography>
        </Paper>

        {/* Main Content */}
        <Paper elevation={2} sx={{ p: 5 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.8,
              textAlign: 'justify',
              fontSize: '1.1rem',
            }}
          >
            {/* {t('aboutContent')} */}
            Business Review is a regional digital outlet bringing the Middle East’s business conversations to life. From corporate developments and market trends to lifestyle, entertainment, and travel, we cover the sectors shaping how the region grows, innovates, and connects with the world. Designed for a regional audience, our reporting combines market intelligence with cultural insight, delivering timely, informed stories from across the GCC. At Business Review, this is where the Middle East talks business, beyond borders, beyond headlines.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default AboutPage

