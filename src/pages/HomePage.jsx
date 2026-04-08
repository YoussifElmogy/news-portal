import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getLatestNews, getNewsByCategory } from '../services/newsApi'
import { useCategoriesContext } from '../contexts/CategoriesContext'
import { filterNewsByLanguage } from '../utils/newsFilter'
import { useCurrentLang } from '../hooks/useCurrentLang'
import saudiLogo from '../assets/saudi-logo.jpg'

const HomePage = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { categories, homepageCategories } = useCategoriesContext()
  const isArabic = i18n.language === 'ar'
  const currentLang = useCurrentLang()

  const [latestNews, setLatestNews] = useState([])
  const [categoryNewsData, setCategoryNewsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch latest news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        
        // Fetch latest news
        const news = await getLatestNews(12)
        const filtered = filterNewsByLanguage(news, isArabic)
        setLatestNews(filtered.slice(0, 12)) // 12 cards
        
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

  // Fetch category news
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const promises = homepageCategories.map(async (catId) => {
          const category = categories.find(cat => cat.id === catId)
          if (category) {
            const data = await getNewsByCategory(category.slug, 0, 10)
            const filtered = filterNewsByLanguage(data.content, isArabic)
            return { [catId]: filtered.slice(0, 3) }
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
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

  return (
    <>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-50%',
            left: '-20%',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item size={{ xs: 12, md: 6 }}>
              <Box>
      
                
                <Typography 
                  variant="h1" 
                  component="h1" 
                  fontWeight="900" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                    lineHeight: 1.1,
                    mb: 3,
                  }}
                >
                  Saudi Daily
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    opacity: 0.95, 
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Your trusted source for breaking news, in-depth analysis, and exclusive stories from Saudi Arabia and around the globe
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleViewAll('all')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      boxShadow: 3,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    {t('exploreNews')}
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                  }}
                />
                <Box
                  component="img"
                  src={saudiLogo}
                  alt="Saudi Daily"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 450,
                    height: 'auto',
                    margin: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Wave Divider */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ height: 60, width: '100%' }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="white"
              opacity="0.3"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="white"
            />
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Latest News Section with Stats */}
        <Box sx={{ mb: 8 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 5,
                  height: 50,
                  bgcolor: 'primary.main',
                  mr: 2,
                  borderRadius: 1,
                }}
              />
              <Box>
                <Typography variant="h3" component="h2" fontWeight="bold">
                  {t('latestNews')}
                </Typography>
          
              </Box>
            </Box>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleViewAll('all')}
              sx={{
                fontWeight: 600,
                borderWidth: 2,
                px: 3,
                py: 1,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateX(5px)',
                },
                transition: 'all 0.3s',
              }}
            >
              {t('viewAll')}
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {latestNews.map((news, index) => (
              <Grid 
                item 
                size={{ xs: 12, sm: 6, md: 4 }} 
                key={news.id}
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Category Sections with Modern Design */}
        {categories
          .filter((cat) => homepageCategories.includes(cat.id))
          .map((category, catIndex) => {
            const categoryNews = categoryNewsData[category.id] || []

            if (categoryNews.length === 0) return null

            return (
              <Box 
                key={category.id} 
                sx={{ 
                  mb: 8,
                  animation: `fadeIn 0.8s ease-out ${catIndex * 0.2}s backwards`,
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 5,
                        height: 50,
                        bgcolor: 'primary.main',
                        mr: 2,
                        borderRadius: 1,
                      }}
                    />
                    <Box>
                      <Typography variant="h3" component="h2" fontWeight="bold">
                        {t(category.nameKey)}
                      </Typography>
                
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleViewAll(category.slug)}
                    sx={{
                      fontWeight: 600,
                      borderWidth: 2,
                      px: 3,
                      py: 1,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateX(5px)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    {t('viewAll')}
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {categoryNews.map((news, index) => (
                    <Grid 
                      item 
                      size={{ xs: 12, sm: 6, md: 4 }} 
                      key={news.id}
                      sx={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                        '@keyframes fadeInUp': {
                          from: {
                            opacity: 0,
                            transform: 'translateY(30px)',
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
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
