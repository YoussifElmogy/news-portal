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
  Chip,
  InputAdornment,
  TextField,
} from '@mui/material'
import {
  Home as HomeIcon,
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material'
import NewsCard from '../components/NewsCard'
import { searchNews } from '../services/newsApi'
import { filterNewsByLanguage } from '../utils/newsFilter'

const ITEMS_PER_PAGE = 9

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const query = searchParams.get('q') || ''
  const currentPage = parseInt(searchParams.get('page')) || 1

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    setSearchInput(query)
    
    if (!query.trim()) {
      setLoading(false)
      setNews([])
      return
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        // API pages are 0-indexed
        const data = await searchNews(query, currentPage - 1, ITEMS_PER_PAGE * 2) // Fetch more
        const filtered = filterNewsByLanguage(data.content, isArabic)
        setNews(filtered.slice(0, ITEMS_PER_PAGE))
        // Recalculate pagination based on filtered results
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE))
        setTotalElements(filtered.length)
      } catch (err) {
        setError('Failed to search news. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, currentPage, isArabic])

  const handlePageChange = (event, value) => {
    setSearchParams({ q: query, page: value })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), page: 1 })
    }
  }

  const isArabic = i18n.language === 'ar'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <SearchIcon sx={{ fontSize: 40 }} />
            <Typography variant="h3" component="h1" fontWeight="bold">
              {t('searchResults')}
            </Typography>
          </Box>

          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={handleSearchSubmit}
            elevation={3}
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
            }}
          >
            <TextField
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('searchPlaceholder')}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { fontSize: '1.1rem', px: 2 },
              }}
            />
          </Paper>
        </Container>
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
          <Typography color="text.primary">{t('searchResults')}</Typography>
        </Breadcrumbs>

        {/* Query Info */}
        {query && (
          <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h6" component="div">
                {t('searchResultsFor')}:
              </Typography>
              <Chip
                label={`"${query}"`}
                color="primary"
                size="large"
                icon={<TrendingIcon />}
                sx={{ fontSize: '1rem', py: 2.5 }}
              />
              {!loading && totalElements > 0 && (
                <Typography variant="body1" color="text.secondary">
                  ({totalElements} {t('results')})
                </Typography>
              )}
            </Box>
          </Paper>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : !query.trim() ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {t('searchPlaceholder')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('searchHint')}
            </Typography>
          </Paper>
        ) : (
          <>
            {/* Results Grid */}
            {news.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {news.map((newsItem) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={newsItem.id}>
                      <NewsCard news={newsItem} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination Section */}
                {totalPages > 1 && (
                  <Box sx={{ mt: 6 }}>
                    {/* Results Summary */}
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
            ) : (
              <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                <SearchIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  {t('noSearchResults')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('noSearchResultsDesc')}
                </Typography>
              </Paper>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}

export default SearchResults

