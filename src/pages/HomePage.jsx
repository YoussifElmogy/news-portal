import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const HomePage = () => {
  const navigate = useNavigate()
  const { lang } = useParams()
  const { t, i18n } = useTranslation()
  const { categories, homepageCategories } = useCategoriesContext()
  const isArabic = i18n.language === 'ar'
  const currentLang = lang || i18n.language || 'en'

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
            return { [catId]: filtered.slice(0, 4) } // Take first 3 after filtering
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
      {/* Hero Section - Simple */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${newsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Chip
              label={t('latestNews')}

              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                mb: 3,
              }}
            />
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
              {t('news')}
            </Typography>
        
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <Box sx={{ mt: 10 }}>
          

            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
                    <Box 
                      sx={{ 
                        flex: { xs: '1', md: '1 1 50%' },
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.95 },
                      }}
                      onClick={() => handleNewsClick(news.id)}
                    >
                      <CardMedia
                        component="img"
                        image={news.image}
                        alt={isArabic ? news.titleAr : news.title}
                        sx={{ 
                          objectFit: 'cover', 
                          height: { xs: '250px', md: '350px' },
                          width: '100%',
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: { xs: '1', md: '1 1 50%' } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Chip
                          label={t(news.category)}
                          size="small"
                          sx={{ mb: 2, bgcolor: 'primary.main', color: 'white' }}
                        />
                        <Typography variant="h5" component="h2" gutterBottom fontWeight={700}>
                          {isArabic ? news.titleAr : news.title}
                        </Typography>
                        <Typography
                          variant="body2"
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(news.date)}
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleNewsClick(news.id)}
                          >
                            {t('readMore')}
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                ))}
                </Box>
              </Box>
              
            </Paper>
            {featuredNews.length > 1 && (
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                <IconButton
                  onClick={handlePrevSlide}
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {isArabic ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                </IconButton>
                <IconButton
                  onClick={handleNextSlide}
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {isArabic ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                </IconButton>
              </Box>
            )}
          </Box>
          
        )}

        {/* Category Sections - Rearranged Layout */}
        {categories
          .filter((cat) => homepageCategories.includes(cat.id))
          .map((category, index) => {
            const categoryNews = categoryNewsData[category.id] || []
            
            if (categoryNews.length === 0) return null

            return (
              <Box key={category.id}>
                {/* First Category */}
                {index === 0 && (
                  <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: 2, borderColor: 'divider' }}>
                      <Typography variant="h4" fontWeight={700}>
                        {t(category.nameKey)}
                      </Typography>
                      <Button
                        variant="text"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleViewAll(category.slug)}
                        sx={{ fontWeight: 600 }}
                      >
                        {t('viewAll')}
                      </Button>
                    </Box>
                    
                    <Grid container spacing={3}>
                      {categoryNews.map((news) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 6 }} key={news.id}>
                          <NewsCard news={news} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* All News after first category */}
                {index === 1 && (
                  <>
                    <Box sx={{ mb: 8 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: 2, borderColor: 'divider' }}>
                        <Typography variant="h4" fontWeight={700}>
                          {t('allNews')}
                        </Typography>
                        <Button
                          variant="text"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleViewAll('all')}
                          sx={{ fontWeight: 600 }}
                        >
                          {t('viewAll')}
                        </Button>
                      </Box>
                      
                      <Grid container spacing={3}>
                        {secondaryNews.map((news) => (
                          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={news.id}>
                            <NewsCard news={news} />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    {/* Second Category */}
                    <Box sx={{ mb: 8 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: 2, borderColor: 'divider' }}>
                        <Typography variant="h4" fontWeight={700}>
                          {t(category.nameKey)}
                        </Typography>
                        <Button
                          variant="text"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleViewAll(category.slug)}
                          sx={{ fontWeight: 600 }}
                        >
                          {t('viewAll')}
                        </Button>
                      </Box>
                      
                      <Grid container spacing={3}>
                        {categoryNews.map((news) => (
                          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={news.id}>
                            <NewsCard news={news} />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </>
                )}

                {/* Third Category and beyond */}
                {index === 2 && (
                  <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: 2, borderColor: 'divider' }}>
                      <Typography variant="h4" fontWeight={700}>
                        {t(category.nameKey)}
                      </Typography>
                      <Button
                        variant="text"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleViewAll(category.slug)}
                        sx={{ fontWeight: 600 }}
                      >
                        {t('viewAll')}
                      </Button>
                    </Box>
                    
                    <Grid container spacing={3}>
                      {categoryNews.map((news) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 6 }} key={news.id}>
                          <NewsCard news={news} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            )
          })}
      </Container>
    </>
  )
}

export default HomePage

