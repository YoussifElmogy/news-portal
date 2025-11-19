import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { 
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getLatestNews, getNewsByCategory } from '../services/newsApi'
import { useCategoriesContext } from '../contexts/CategoriesContext'
import newsBgImage from '../assets/news-bg.png'

const HomePage = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { categories, homepageCategories } = useCategoriesContext()
  const isArabic = i18n.language === 'ar'

  const [latestNews, setLatestNews] = useState([])
  const [categoryNewsData, setCategoryNewsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch latest news
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true)
        const news = await getLatestNews(4)
        setLatestNews(news)
        setError(null)
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  // Fetch category news
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const promises = homepageCategories.map(async (catId) => {
          const category = categories.find(cat => cat.id === catId)
          if (category) {
            const data = await getNewsByCategory(category.slug, 0, 4)
            return { [catId]: data.content }
          }
          return { [catId]: [] }
        })

        const results = await Promise.all(promises)
        const newsData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        setCategoryNewsData(newsData)
      } catch (err) {
        console.error('Error fetching category news:', err)
      }
    }

    if (homepageCategories.length > 0) {
      fetchCategoryNews()
    }
  }, [categories, homepageCategories])

  const handleViewAll = (categorySlug) => {
    navigate(`/news?category=${categorySlug}`)
  }

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const featuredNews = latestNews[0]
  const secondaryNews = latestNews.slice(1, 4)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  if (!featuredNews) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info">No news available at the moment.</Alert>
      </Container>
    )
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${newsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: { xs: 'scroll', md: 'fixed' }, // Fixed only on desktop for parallax
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: {xs:4,md:2} }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2, bgcolor: 'rgba(255, 255, 255, 0.2)', px: 3, py: 1, borderRadius: 10 }}>
              <TrendingUpIcon sx={{ fontSize: 24, mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="600">
                {t('latestNews')}
              </Typography>
            </Box>
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
              {t('news')}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              {t('footerDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, mb: 8, position: 'relative', zIndex: 2 }}>
        {/* Featured News Section */}
        <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden', mb: 6 }}>
          <Grid container>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.9 }
                }}
                onClick={() => handleNewsClick(featuredNews.id)}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={featuredNews.image}
                  alt={isArabic ? featuredNews.titleAr : featuredNews.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chip 
                  label={t(featuredNews.category)} 
                  color="primary" 
                  size="small" 
                  sx={{ mb: 2, width: 'fit-content' }}
                />
                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                  {isArabic ? featuredNews.titleAr : featuredNews.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {isArabic ? featuredNews.descriptionAr : featuredNews.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(featuredNews.date)}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleNewsClick(featuredNews.id)}
                  sx={{ width: 'fit-content' }}
                >
                  {t('readMore')}
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Paper>

        {/* Latest News Grid */}
        <Box sx={{ mb: 8 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: 'grey.50',
              borderLeft: 4,
              borderColor: 'primary.main',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h4" component="h2" fontWeight="bold">
                  {t('allNews')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t('latestNews')}
                </Typography>
              </Box>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleViewAll('all')}
              >
                {t('viewAll')}
              </Button>
            </Box>
          </Paper>
          
          <Grid container spacing={3}>
            {secondaryNews.map((news) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={news.id}>
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Category Sections */}
        {categories
          .filter((cat) => homepageCategories.includes(cat.id))
          .map((category, index) => {
            const categoryNews = categoryNewsData[category.id] || []
            
            if (categoryNews.length === 0) return null

            return (
              <Box key={category.id} sx={{ mb: 8 }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    bgcolor: 'grey.50',
                    borderLeft: 4,
                    borderColor: 'primary.main',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="h4" component="h2" fontWeight="bold">
                        {t(category.nameKey)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {t('newsTitle', { category: t(category.nameKey) })}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleViewAll(category.slug)}
                    >
                      {t('viewAll')}
                    </Button>
                  </Box>
                </Paper>
                
                <Grid container spacing={3}>
                  {categoryNews.map((news) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={news.id}>
                      <NewsCard news={news} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          })}
      </Container>
    </>
  )
}

export default HomePage

