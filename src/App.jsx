import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import HomePage from './pages/HomePage'
import SingleNews from './pages/SingleNews'
import NewsCategory from './pages/NewsCategory'
import SearchResults from './pages/SearchResults'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsCategory />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
