import { useState } from 'react'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Article as ArticleIcon,
  Language as LanguageIcon,
  Home as HomeIcon,
  Close as CloseIcon,
  Facebook as FacebookIcon,
  X as XIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'
import { useCategoriesContext } from '../contexts/CategoriesContext'
import logo from '../assets/saudi-logo.jpg'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams()
  const { t, i18n } = useTranslation()
  const { categories } = useCategoriesContext()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null)

  const currentLang = lang || i18n.language || 'en'

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  const handleCategoryClick = (categorySlug) => {
    navigate(`/${currentLang}/news?category=${categorySlug}`)
    setDrawerOpen(false)
  }

  const handleNavigation = (path) => {
    navigate(`/${currentLang}${path}`)
    setDrawerOpen(false)
  }

  const handleLanguageChange = (newLang) => {
    const pathWithoutLang = location.pathname.replace(/^\/(en|ar)/, '') || '/'
    i18n.changeLanguage(newLang)
    const newPath = pathWithoutLang === '/' ? `/${newLang}` : `/${newLang}${pathWithoutLang}`
    navigate(newPath + location.search, { replace: true })
    setLanguageMenuAnchor(null)
  }

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchor(event.currentTarget)
  }

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null)
  }

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Menu
        </Typography>
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigation('/')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
              },
            }}
          >
            <ListItemText 
              primary={t('home')} 
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem sx={{ px: 1 }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            fontWeight={700}
            textTransform="uppercase"
            letterSpacing={1}
          >
            {t('categories')}
          </Typography>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleCategoryClick('all')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              pl: 3,
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
              },
            }}
          >
            <ListItemText primary={t('allNews')} />
          </ListItemButton>
        </ListItem>

        {categories.filter(cat => cat.id !== 'all').map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton 
              onClick={() => handleCategoryClick(category.slug)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: 3,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemText primary={t(category.nameKey)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Social Media Icons */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom color="text.secondary">
          {t('followUs')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
          <IconButton 
            size="small"
            sx={{ 
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
            aria-label="Facebook"
          >
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
            aria-label="X"
          >
            <XIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
            aria-label="Instagram"
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ py: 1, justifyContent: 'space-between', minHeight: { xs: 70, md: 80 } }}>
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              mr: 2, 
              display: { xs: 'flex', lg: 'none' },
              color: 'text.primary',
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link to={`/${currentLang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Saudi Daily"
              sx={{
                height: { xs: 50, md: 60 },
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Button 
              component={Link} 
              to={`/${currentLang}`}
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {t('home')}
            </Button>
            
            <Button
              onClick={() => handleCategoryClick('all')}
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {t('allNews')}
            </Button>
            
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t(category.nameKey)}
              </Button>
            ))}
          </Box>

          {/* Desktop Language Selector */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button
              startIcon={<LanguageIcon />}
              onClick={handleLanguageMenuOpen}
              sx={{
                color: 'white',
                bgcolor: 'primary.main',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {i18n.language === 'ar' ? 'AR' : 'EN'}
            </Button>
          </Box>

          {/* Mobile Language Icon */}
          <IconButton 
            onClick={handleLanguageMenuOpen}
            sx={{ 
              display: { xs: 'flex', lg: 'none' },
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            size="small"
          >
            <LanguageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Language Menu */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={i18n.language === 'en'}
        >
          English
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('ar')}
          selected={i18n.language === 'ar'}
        >
          العربية
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor={i18n.language === 'ar' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Navbar

