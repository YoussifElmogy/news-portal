import { createContext, useContext, useState } from 'react'

const CategoriesContext = createContext()

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategoriesContext must be used within CategoriesProvider')
  }
  return context
}

export const CategoriesProvider = ({ children }) => {
  // In the future, this will come from the backend
  const [categories] = useState([
    { id: 'all', nameKey: 'allNewsTitle', slug: 'all' },
    { id: 'business', nameKey: 'business', slug: 'business' },
    { id: 'entertainment', nameKey: 'entertainment', slug: 'entertainment' },
    { id: 'lifestyle', nameKey: 'lifestyle', slug: 'lifestyle' },
    { id: 'travel', nameKey: 'travel', slug: 'travel' },
    { id: 'sports', nameKey: 'sports', slug: 'sports' },
    { id: 'tech', nameKey: 'tech', slug: 'tech' },
    { id: 'opinions', nameKey: 'opinions', slug: 'opinions' },
    { id: 'interviews', nameKey: 'interviews', slug: 'interviews' },
  ])

  // Categories to show on home page
  const homepageCategories = ['business', 'entertainment', 'lifestyle']

  return (
    <CategoriesContext.Provider value={{ categories, homepageCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

