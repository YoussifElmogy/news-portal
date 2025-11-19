import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTranslation } from 'react-i18next'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'

const ThemeContext = createContext()

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
})

export const ThemeProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const [primaryColor, setPrimaryColor] = useState('#660000')
  const isRtl = i18n.language === 'ar'
  
  // Update document direction when language changes
  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [isRtl, i18n.language])
  
  const theme = useMemo(
    () => {
      let baseTheme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: '#dc004e',
          },
        },
        direction: isRtl ? 'rtl' : 'ltr',
        typography: {
          fontFamily: isRtl 
            ? '"Cairo", "Open Sans", "Helvetica", "Arial", sans-serif'
            : '"Open Sans", "Helvetica", "Arial", sans-serif',
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      })
      
      // Enable responsive font sizes
      return responsiveFontSizes(baseTheme, {
        factor: 3, // Higher factor = more aggressive scaling
      })
    },
    [primaryColor, isRtl]
  )

  const value = {
    primaryColor,
    setPrimaryColor,
  }

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeContext.Provider value={value}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  )
}

