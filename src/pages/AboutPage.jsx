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
            Saudi Daily is a national digital platform dedicated to telling the story of Saudi Arabia in all its dimensions. From business, and technology to lifestyle, entertainment, and travel, we report on the people, sectors, and ideas shaping life across the Kingdom. Rooted in a deep understanding of Saudi Arabia’s evolving identity, our content reflects both the pace of transformation and the nuances of everyday experiences, bringing into focus the stories shaping the Kingdom today.          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default AboutPage

