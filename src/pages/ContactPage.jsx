import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material'
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from '@mui/icons-material'

const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
          {/* {t('contactUs')} */}
          Contact Us
        </Typography>


        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item size={{xs:12, md:4}}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {/* {t('getInTouch')} */}
                Get in Touch
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {/* {t('contactInfo')} */}
                Feel free to reach out to us through:
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {/* {t('email')} */}
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      contact@newsportal.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item size={{xs:12, md:8}}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {/* {t('sendMessage')} */}
                Send a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {/* {t('formDescription')} */}
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {t('messageSent')}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                      <Grid item size={{xs:12}}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{ minWidth: 150 }}
                    >
                      {/* {t('sendMessage')} */}
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>  
    </Box>
  )
}

export default ContactPage

