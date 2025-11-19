import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Typography,
  Box,
  Chip,
  Breadcrumbs,
  Link,
  Button,
  Grid,
  Divider,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Share as ShareIcon,
  Home as HomeIcon,
} from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getNewsById, getRelatedNews } from '../services/newsApi'

const SingleNews = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const newsItem = await getNewsById(id)
        setNews(newsItem)
        
        // Fetch related news
        const related = await getRelatedNews(id, newsItem.category, 3)
        setRelatedNews(related)
      } catch (err) {
        setError('Failed to load news article.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  if (error || !news) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error || 'News article not found.'}</Alert>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isArabic ? news.titleAr : news.title,
        text: isArabic ? news.descriptionAr : news.description,
        url: window.location.href,
      })
    }
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            {t('homeLink')}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/news?category=${news.category}`)}
          >
            {t(news.category)}
          </Link>
          <Typography color="text.primary">
            {isArabic ? news.titleAr : news.title}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          {/* Category Chip */}
          <Chip
            label={t(news.category)}
            color="primary"
            sx={{ mb: 2 }}
          />

          {/* Title */}
          <Typography variant="h3" component="h1" gutterBottom>
            {isArabic ? news.titleAr : news.title}
          </Typography>

          {/* Meta Information */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mb: 3,
              flexWrap: 'wrap',
              color: 'text.secondary',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">
                {t('publishedOn')}: {formatDate(news.date)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">{news.author}</Typography>
            </Box>
          </Box>

          {/* Featured Image */}
          <Box
            component="img"
            src={news.image}
            alt={isArabic ? news.titleAr : news.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
            }}
          />

          {/* Description */}
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 3, fontWeight: 500 }}
          >
            {isArabic ? news.descriptionAr : news.description}
          </Typography>


          {/* Share Button */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              {t('share')}
            </Button>
          </Box>
        </Paper>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              {t('relatedNews')}
            </Typography>
            <Grid container spacing={4}>
              {relatedNews.map((relatedItem) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={relatedItem.id}>
                  <NewsCard news={relatedItem} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}

export default SingleNews

