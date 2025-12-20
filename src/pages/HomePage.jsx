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
  IconButton,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getLatestNews, getNewsByCategory, getFeaturedNews } from '../services/newsApi'
import { useCategoriesContext } from '../contexts/CategoriesContext'
import { filterNewsByLanguage } from '../utils/newsFilter'
import newsBgImage from '../assets/news-bg.png'
import { useCurrentLang } from '../hooks/useCurrentLang'

const HomePage = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { categories, homepageCategories } = useCategoriesContext()
  const isArabic = i18n.language === 'ar'
  const currentLang = useCurrentLang()

  const [featuredNews, setFeaturedNews] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [latestNews, setLatestNews] = useState([])
  const [categoryNewsData, setCategoryNewsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch featured and latest news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        
        // Fetch featured news
        const featured = await getFeaturedNews()
        const filteredFeatured = filterNewsByLanguage(featured, isArabic)
        setFeaturedNews(filteredFeatured)
        
        // Fetch latest news
        const news = await getLatestNews(10)
        const filtered = filterNewsByLanguage(news, isArabic)
        const nonFeatured = filtered.filter(item => !item.isFeatured)
        setLatestNews(nonFeatured.slice(0, 3)) // 3 cards below featured
        
        setError(null)
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [isArabic])

  // Reset slide when language changes or featured news array changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [isArabic, featuredNews.length])

  // Fetch category news
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const promises = homepageCategories.map(async (catId) => {
          const category = categories.find(cat => cat.id === catId)
          if (category) {
            const data = await getNewsByCategory(category.slug, 0, 10) // Fetch more
            const filtered = filterNewsByLanguage(data.content, isArabic)
            return { [catId]: filtered.slice(0, 3) } // Take first 3 after filtering
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
  }, [categories, homepageCategories, isArabic])

  const handleViewAll = (categorySlug) => {
    navigate(`/${currentLang}/news?category=${categorySlug}`)
  }

  const handleNewsClick = (newsId) => {
    navigate(`/${currentLang}/news/${newsId}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      calendar: 'gregory', // Force Gregorian calendar
    })
  }

  const secondaryNews = latestNews

  const handleNextSlide = () => {
    if (featuredNews.length === 0) return
    setCurrentSlide((prev) => {
      const next = (prev + 1) % featuredNews.length
      return next
    })
  }

  const handlePrevSlide = () => {
    if (featuredNews.length === 0) return
    setCurrentSlide((prev) => {
      const previous = (prev - 1 + featuredNews.length) % featuredNews.length
      return previous
    })
  }

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

  if (featuredNews.length === 0 && latestNews.length === 0) {
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
              <Typography variant="subtitle1" fontWeight="600">
                {t('latestNews')}
              </Typography>
            </Box>
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
              {t('news')}
            </Typography>
            {/* <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              {t('footerDescription')}
            </Typography> */}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, mb: 8, position: 'relative', zIndex: 2 }}>
        {/* Featured News Section - Slider */}
        {featuredNews.length > 0 && (
          <Box sx={{ position: 'relative', mb: 10 }}>
            {/* Navigation Arrows - Bottom Center */}
            {featuredNews.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -60,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 3,
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={handlePrevSlide}
                  sx={{
                    bgcolor: 'white',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    boxShadow: 3,
                    width: { xs: 35, md: 35 },
                    height: { xs: 35, md: 35 },
                  }}
                >
                  {isArabic ? <ArrowForwardIcon sx /> : <ArrowBackIcon />}
                </IconButton>
                <IconButton
                  onClick={handleNextSlide}
                  sx={{
                    bgcolor: 'white',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    boxShadow: 3,
                    width: { xs: 35, md: 35 },
                    height: { xs: 35, md: 35 },
                  }}
                >
                  {isArabic ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                </IconButton>
              </Box>
            )}

            <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                {/* Slider Container */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                {featuredNews.map((news, index) => (
                  <Box
                    key={news.id}
                    sx={{
                      minWidth: '100%',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                      <Card
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.9 },
                        }}
                        onClick={() => handleNewsClick(news.id)}
                      >
                        <CardMedia
                          component="img"
                          height="400"
                          image={news.image}
                          alt={isArabic ? news.titleAr : news.title}
                          sx={{ objectFit: 'cover', height: { xs: '400px', md: '400px' } }}
                        />
                      </Card> 
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                      <CardContent
                        sx={{
                          p: 4,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <Chip
                          label={t(news.category)}
                          color="primary"
                          size="small"
                          sx={{ mb: 2, width: 'fit-content' }}
                        />
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                          {isArabic ? news.titleAr.slice(0, 50).concat('...') : news.title.slice(0, 50).concat('...')}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            '& *': { 
                              margin: 0,
                              padding: 0,
                              display: 'inline',
                            },
                            '& p, & div, & h1, & h2, & h3, & h4, & h5, & h6': { 
                              display: 'inline',
                              fontSize: 'inherit',
                              fontWeight: 'inherit',
                            },
                            '& strong, & b': { 
                              fontWeight: 700,
                            },
                            '& em, & i': { 
                              fontStyle: 'italic',
                            },
                            '& ol, & ul': { 
                              display: 'inline',
                              listStyle: 'none',
                            },
                            '& li': { 
                              display: 'inline',
                              '&::before': {
                                content: '" "',
                              },
                            },
                            '& br': { display: 'none' },
                          }}
                          dangerouslySetInnerHTML={{ 
                            __html: isArabic ? news.descriptionAr : news.description 
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(news.date)}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleNewsClick(news.id)}
                          sx={{ width: 'fit-content' }}
                        >
                          {t('readMore')}
                        </Button>
                      </CardContent>
                    </Box>
                  </Box>
                ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        )}

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

