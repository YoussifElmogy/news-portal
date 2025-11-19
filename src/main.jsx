import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { CategoriesProvider } from './contexts/CategoriesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </ThemeProvider>
  </StrictMode>,
)
