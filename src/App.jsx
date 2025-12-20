import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import HomePage from './pages/HomePage'
import SingleNews from './pages/SingleNews'
import NewsCategory from './pages/NewsCategory'
import SearchResults from './pages/SearchResults'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

// Component to sync URL language with i18n
function LanguageSync() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'ar')) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [lang, i18n])

  return null
}

// Redirect component for root path
function RootRedirect() {
  const storedLang = localStorage.getItem('language') || 'en'
  return <Navigate to={`/${storedLang}`} replace />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <Layout>
        <Routes>
          {/* Redirect root to stored language */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<><LanguageSync /><HomePage /></>} />
          <Route path="/:lang/news" element={<><LanguageSync /><NewsCategory /></>} />
          <Route path="/:lang/news/:id" element={<><LanguageSync /><SingleNews /></>} />
          <Route path="/:lang/search" element={<><LanguageSync /><SearchResults /></>} />
          <Route path="/:lang/about" element={<><LanguageSync /><AboutPage /></>} />
          <Route path="/:lang/contact" element={<><LanguageSync /><ContactPage /></>} />
          
          {/* Fallback: redirect any other path to stored language home */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
