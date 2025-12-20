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

// Sync URL language with i18n
function LanguageWrapper({ children }) {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  
  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'ar') && i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])
  
  return children
}

// Redirect root to saved language
function RootRedirect() {
  const savedLang = localStorage.getItem('language') || 'en'
  return <Navigate to={`/${savedLang}`} replace />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <Layout>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:lang" element={<LanguageWrapper><HomePage /></LanguageWrapper>} />
          <Route path="/:lang/news" element={<LanguageWrapper><NewsCategory /></LanguageWrapper>} />
          <Route path="/:lang/news/:id" element={<LanguageWrapper><SingleNews /></LanguageWrapper>} />
          <Route path="/:lang/search" element={<LanguageWrapper><SearchResults /></LanguageWrapper>} />
          <Route path="/:lang/about" element={<LanguageWrapper><AboutPage /></LanguageWrapper>} />
          <Route path="/:lang/contact" element={<LanguageWrapper><ContactPage /></LanguageWrapper>} />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
