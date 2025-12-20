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
import { filterNewsByLanguage } from '../utils/newsFilter'

const SingleNews = () => {
  const { id, lang } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const currentLang = lang || i18n.language || 'en'
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
        const related = await getRelatedNews(id, newsItem.category, 10)
        const filtered = filterNewsByLanguage(related, isArabic)
        setRelatedNews(filtered.slice(0, 3))
      } catch (err) {
        setError('Failed to load news article.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id, isArabic])

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
        <Button variant="contained" onClick={() => navigate(`/${currentLang}`)} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    )
  }

  // Check if news has title in current language
  const hasValidTitle = isArabic 
    ? (news.titleAr && news.titleAr.trim() !== '')
    : (news.title && news.title.trim() !== '')

  if (!hasValidTitle) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {isArabic 
            ? 'هذا الخبر غير متوفر باللغة العربية'
            : 'This news article is not available in English'
          }
        </Alert>
        <Button variant="contained" onClick={() => navigate(`/${currentLang}`)} sx={{ mt: 2 }}>
          {t('homeLink')}
        </Button>
      </Container>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory', // Force Gregorian calendar
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
            href={`/${currentLang}`}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${currentLang}`)
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            {t('homeLink')}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/${currentLang}/news?category=${news.category}`)}
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
          <Box
            sx={{ 
              mb: 3,
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              '& p': { 
                margin: '1em 0',
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': { 
                fontWeight: 700,
                color: 'text.primary',
                marginTop: '1.5em',
                marginBottom: '0.5em',
              },
              '& h1': { fontSize: '2rem' },
              '& h2': { fontSize: '1.75rem' },
              '& h3': { fontSize: '1.5rem' },
              '& h4': { fontSize: '1.25rem' },
              '& strong, & b': { 
                fontWeight: 700,
                color: 'text.primary',
              },
              '& em, & i': { 
                fontStyle: 'italic',
              },
              '& ul, & ol': { 
                margin: '1em 0',
                paddingLeft: '2em',
              },
              '& li': { 
                margin: '0.5em 0',
              },
              '& a': { 
                color: 'primary.main',
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none',
                },
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                paddingLeft: '1em',
                margin: '1.5em 0',
                fontStyle: 'italic',
              },
            }}
            dangerouslySetInnerHTML={{ 
              __html: isArabic ? news.descriptionAr : news.description 
            }}
          />


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

