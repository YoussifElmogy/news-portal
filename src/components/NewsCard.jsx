import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material'
import { CalendarToday as CalendarIcon } from '@mui/icons-material'

const NewsCard = ({ news }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const handleReadMore = () => {
    navigate(`/news/${news.id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
          cursor: 'pointer',
        },
      }}
      onClick={handleReadMore}
    >
      <CardMedia
        component="img"
        height="200"
        image={news.image}
        alt={isArabic ? news.titleAr : news.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={t(news.category)}
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography gutterBottom variant="h6" component="h3">
          {isArabic ? news.titleAr : news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {isArabic ? news.descriptionAr : news.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(news.date)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleReadMore}>
          {t('readMore')}
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard

