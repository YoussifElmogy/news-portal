import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
import logo from '../assets/br-bg.png'

const Navbar = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { categories } = useCategoriesContext()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  const handleCategoryClick = (categorySlug) => {
    navigate(`/news?category=${categorySlug}`)
    setDrawerOpen(false)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    setLanguageMenuAnchor(null) // Close menu after selection
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
          p: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        </Box>
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemText 
              primary={t('home')} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem>
          <ListItemText 
            primary={t('categories')} 
            primaryTypographyProps={{ 
              variant: 'caption', 
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleCategoryClick('all')}>
            <ListItemText primary={t('allNews')} sx={{ pl: 2 }} />
          </ListItemButton>
        </ListItem>

        {categories.filter(cat => cat.id !== 'all').map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category.slug)}>
              <ListItemText primary={t(category.nameKey)} sx={{ pl: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}

      </List>

      {/* Social Media Icons */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          {t('followUs')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <IconButton 
            size="small"
            sx={{ 
              color: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': { 
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            aria-label="Facebook"
          >
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': { 
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            aria-label="X"
          >
            <XIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': { 
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            aria-label="Instagram"
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': { 
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Language Selector at Bottom */}
      <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LanguageIcon color="primary" />
          <Typography variant="body2" fontWeight={500}>
            {t('language')}
          </Typography>
        </Box>
        <Select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          size="small"
          fullWidth
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { xs: 'flex', lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{marginInlineEnd: {xs: 'auto', md: 0}}}>   
                   <Link to="/" >
         <img src={logo} alt="logo" width={120} height={70} style={{marginTop:'10px'}} />
         </Link>
         </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>

            <Button color="inherit" component={Link} to="/">
              {t('home')}
            </Button>
            
            <Button
              color="inherit"
              onClick={() => handleCategoryClick('all')}
            >
              {t('allNews')}
            </Button>
            
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <Button
                key={category.id}
                color="inherit"
                onClick={() => handleCategoryClick(category.slug)}
              >
                {t(category.nameKey)}
              </Button>
            ))}
                 {/* Language Selector (Desktop) */}
          <Box sx={{ ml: 2, display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
            <LanguageIcon />
            <Select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              size="small"
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '.MuiSvgIcon-root': { color: 'white' },
              }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="ar">AR</MenuItem>
            </Select>
          </Box>
          </Box>

     

          {/* Mobile Language Icon */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
            <IconButton 
              color="inherit" 
              size="small"
              onClick={handleLanguageMenuOpen}
              aria-label="select language"
            >
              <LanguageIcon />
            </IconButton>
          </Box>
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

