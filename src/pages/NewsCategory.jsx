import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getNewsByCategory } from '../services/newsApi'
import { filterNewsByLanguage } from '../utils/newsFilter'
import newsBgImage from '../assets/news-bg.png'

const ITEMS_PER_PAGE = 9

const NewsCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  
  const category = searchParams.get('category') || 'all'
  const currentPage = parseInt(searchParams.get('page')) || 1

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        // API pages are 0-indexed, so subtract 1
        const data = await getNewsByCategory(category, currentPage - 1, ITEMS_PER_PAGE * 2) // Fetch more
        const filtered = filterNewsByLanguage(data.content, isArabic)
        setNews(filtered.slice(0, ITEMS_PER_PAGE))
        // Recalculate total pages based on filtered results
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE))
        setTotalElements(filtered.length)
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [category, currentPage, isArabic])

  const handlePageChange = (event, value) => {
    setSearchParams({ category, page: value })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCategoryTitle = () => {
    return category === 'all' ? t('allNewsTitle') : t(category)
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header Image with Title */}
      <Box
        sx={{
          position: 'relative',
          height: 300,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${newsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold">
          {getCategoryTitle()}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
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
          <Typography color="text.primary">{getCategoryTitle()}</Typography>
        </Breadcrumbs>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <>
            {/* News Grid */}
            {news.length > 0 ? (
              <>
                <Grid container spacing={4}>
                  {news.map((newsItem) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={newsItem.id}>
                      <NewsCard news={newsItem} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary">
                  {t('noNewsFound')}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}

export default NewsCategory

