import { useTranslation } from 'react-i18next'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import {
  Visibility as VisionIcon,
  Flag as MissionIcon,
  Favorite as ValuesIcon,
} from '@mui/icons-material'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
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
            {t('aboutUs')}
          </Typography>
          <Typography variant="h6">
            {t('aboutSubtitle')}
          </Typography>
        </Paper>

        {/* Main Content */}
        <Paper elevation={2} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {t('whoWeAre')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('aboutDescription1')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('aboutDescription2')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('aboutDescription3')}
          </Typography>
        </Paper>

        {/* Vision, Mission, Values */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item size={{xs:12, md:4}}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <VisionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {t('ourVision')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('visionText')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <MissionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {t('ourMission')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('missionText')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{xs:12, md:4}}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <ValuesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {t('ourValues')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('valuesText')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* What We Cover */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {t('whatWeCover')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('business')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('entertainment')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('lifestyle')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('travel')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('sports')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('tech')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('opinions')}
                </Typography>
              </Box>
            </Grid>
            <Grid item size={{xs:12, md:6}}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('interviews')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default AboutPage

