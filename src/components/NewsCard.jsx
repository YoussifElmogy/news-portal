import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material'
import { CalendarToday as CalendarIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { useCurrentLang } from '../hooks/useCurrentLang'

const NewsCard = ({ news }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const currentLang = useCurrentLang()

  const handleReadMore = () => {
    navigate(`/${currentLang}/news/${news.id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory',
    })
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 168, 89, 0.15)',
          borderColor: 'primary.main',
        },
      }}
    >
      {/* Image with Overlay */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="220"
          image={news.image}
          alt={isArabic ? news.titleAr : news.title}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        {/* Category Chip Overlay */}
        <Chip
          label={t(news.category)}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            boxShadow: 2,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        {/* Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <CalendarIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {formatDate(news.date)}
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 1.5,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {isArabic ? news.titleAr : news.title}
        </Typography>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.6,
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

        {/* Read More Button */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleReadMore}
          sx={{
            mt: 'auto',
            alignSelf: 'flex-start',
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 2,
            },
          }}
        >
          {t('readMore')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default NewsCard

