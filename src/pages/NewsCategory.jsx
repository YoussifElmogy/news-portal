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

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allFilteredNews, setAllFilteredNews] = useState([])

  // Fetch all news when category or language changes
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true)
        setError(null)
        // Clear previous data immediately to avoid showing stale content
        setNews([])
        setAllFilteredNews([])
        
        // Fetch all items in batches to get accurate pagination after filtering
        const FETCH_SIZE = 100 // Fetch in batches of 100
        let allItems = []
        let currentPageNum = 0
        let hasMore = true
        
        // Fetch all items for the category
        while (hasMore) {
          const data = await getNewsByCategory(category, currentPageNum, FETCH_SIZE)
          allItems = [...allItems, ...data.content]
          
          // Check if there are more pages
          hasMore = data.hasNext && allItems.length < 1000 // Limit to 1000 items max for performance
          currentPageNum++
        }
        
        // Filter by language to get the actual items available in current language
        const filtered = filterNewsByLanguage(allItems, isArabic)
        
        // Store all filtered news for pagination
        setAllFilteredNews(filtered)
        
        // Calculate pagination based on filtered results
        const filteredTotal = filtered.length
        const calculatedTotalPages = Math.max(1, Math.ceil(filteredTotal / ITEMS_PER_PAGE))
        
        setTotalPages(calculatedTotalPages)
        setTotalElements(filteredTotal)
        
        // Reset to page 1 if current page is out of bounds
        if (currentPage > calculatedTotalPages) {
          setSearchParams({ category, page: '1' })
        }
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllNews()
  }, [category, isArabic]) // Removed currentPage and setSearchParams to prevent unnecessary refetches

  // Update displayed news when page changes (using cached filtered news)
  useEffect(() => {
    if (allFilteredNews.length > 0) {
      // Get items for current page from filtered array
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const paginatedNews = allFilteredNews.slice(startIndex, endIndex)
      
      setNews(paginatedNews)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, allFilteredNews])

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

