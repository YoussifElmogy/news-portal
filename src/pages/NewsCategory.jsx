import { useEffect, useState, useRef, useMemo } from 'react'
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
  Paper,
} from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { getNewsByCategory } from '../services/newsApi'
import { filterNewsByLanguage } from '../utils/newsFilter'
import { useCurrentLang } from '../hooks/useCurrentLang'

const ITEMS_PER_PAGE = 9

const NewsCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const currentLang = useCurrentLang()
  
  const category = searchParams.get('category') || 'all'
  const currentPage = parseInt(searchParams.get('page')) || 1

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allRawNews, setAllRawNews] = useState([])
  const fetchControllerRef = useRef(null)

  // Fetch when category changes only — API returns both languages; filtering is client-side.
  useEffect(() => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.cancelled = true
    }

    const controller = { cancelled: false }
    fetchControllerRef.current = controller

    const fetchAllNews = async () => {
      try {
        setLoading(true)
        setError(null)
        setAllRawNews([])

        const FETCH_SIZE = 100
        let allItems = []
        let currentPageNum = 0
        let hasMore = true

        while (hasMore && !controller.cancelled) {
          const data = await getNewsByCategory(category, currentPageNum, FETCH_SIZE)

          if (controller.cancelled) return

          allItems = [...allItems, ...data.content]

          hasMore = data.hasNext && allItems.length < 1000
          currentPageNum++
        }

        if (controller.cancelled) return

        setAllRawNews(allItems)
      } catch (err) {
        if (!controller.cancelled) {
          setError('Failed to load news. Please try again later.')
          console.error(err)
        }
      } finally {
        if (!controller.cancelled) {
          setLoading(false)
        }
      }
    }

    fetchAllNews()

    return () => {
      controller.cancelled = true
    }
  }, [category])

  const filteredNews = useMemo(
    () => filterNewsByLanguage(allRawNews, isArabic),
    [allRawNews, isArabic]
  )

  const totalElements = filteredNews.length
  const totalPages = Math.max(1, Math.ceil(totalElements / ITEMS_PER_PAGE))

  useEffect(() => {
    if (allRawNews.length === 0) return
    if (currentPage > totalPages) {
      setSearchParams({ category, page: '1' })
    }
  }, [currentPage, totalPages, category, setSearchParams, allRawNews.length])

  const news = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredNews, currentPage])

  useEffect(() => {
    if (filteredNews.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, filteredNews])

  const handlePageChange = (event, value) => {
    setSearchParams({ category, page: value })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCategoryTitle = () => {
    return category === 'all' ? t('allNewsTitle') : t(category)
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Modern Header with Saudi Green Theme */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '60%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            sx={{ 
              mb: 3,
              '& .MuiBreadcrumbs-separator': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          >
            <Link
              underline="hover"
              color="rgba(255, 255, 255, 0.9)"
              href={`/${currentLang}`}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                transition: 'color 0.3s',
                '&:hover': {
                  color: 'white',
                },
              }}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/${currentLang}`)
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
              {t('homeLink')}
            </Link>
            <Typography color="white" fontWeight={600}>
              {getCategoryTitle()}
            </Typography>
          </Breadcrumbs>

          {/* Category Title */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {getCategoryTitle()}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 6, mt: 6 }}>

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
              <Grid container spacing={4}>
                {news.map((newsItem) => (
                  <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={newsItem.id}>
                    <NewsCard news={newsItem} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary">
                  {t('noNewsFound')}
                </Typography>
              </Box>
            )}

            {/* Pagination Section - Show if there are multiple pages or more than one page worth of items */}
            {(totalPages > 1 || totalElements > ITEMS_PER_PAGE) && (
              <Box sx={{ mt: 6 }}>
                {/* Results Summary */}
                {totalElements > 0 && (
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      mb: 3, 
                      bgcolor: 'grey.100',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {t('showing')} {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalElements)} {t('of')} {totalElements} {t('results')}
                    </Typography>
                  </Paper>
                )}

                {/* Pagination Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: '1rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}

export default NewsCategory

