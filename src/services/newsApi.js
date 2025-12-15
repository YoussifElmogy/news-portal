const API_BASE_URL = 'https://news-api-eyjk.onrender.com/api/news'

// Transform API response to match our component structure
const transformNewsItem = (item) => ({
  id: item.id,
  title: item.titleEnglish,
  titleAr: item.titleArabic,
  description: item.descriptionEnglish,
  descriptionAr: item.descriptionArabic,
  content: item.descriptionEnglish, // Using description as content for now
  contentAr: item.descriptionArabic,
  image: item.image,
  category: item.category,
  date: item.date,
  author: 'Al Eqtisad', // Default author since API doesn't provide it
  isFeatured: item.isFeatured || false, // Featured flag from backend
})

// Get news by category with pagination
export const getNewsByCategory = async (category, page = 0, size = 10, search = '') => {
  try {
    let url = `${API_BASE_URL}/category/${category}?page=${page}&size=${size}`
    
    // Add search parameter if provided
    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    
    const data = await response.json()
    
    return {
      content: data.content.map(transformNewsItem),
      page: data.page,
      size: data.size,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      hasNext: data.hasNext,
      hasPrevious: data.hasPrevious,
    }
  } catch (error) {
    console.error('Error fetching news by category:', error)
    throw error
  }
}

// Search news across all categories
export const searchNews = async (query, page = 0, size = 10) => {
  return getNewsByCategory('all', page, size, query)
}

// Get single news by ID
export const getNewsById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    
    const data = await response.json()
    return transformNewsItem(data)
  } catch (error) {
    console.error('Error fetching news by ID:', error)
    throw error
  }
}

// Get latest news (using 'all' category)
export const getLatestNews = async (limit = 4) => {
  try {
    const data = await getNewsByCategory('all', 0, limit)
    return data.content
  } catch (error) {
    console.error('Error fetching latest news:', error)
    throw error
  }
}

// Get featured news only
export const getFeaturedNews = async () => {
  try {
    const data = await getNewsByCategory('all', 0, 30) // Fetch more to find featured
    return data.content.filter(news => news.isFeatured === true)
  } catch (error) {
    console.error('Error fetching featured news:', error)
    throw error
  }
}

// Get related news (same category, excluding current)
export const getRelatedNews = async (newsId, category, limit = 3) => {
  try {
    const data = await getNewsByCategory(category, 0, limit + 5)
    // Filter out current news and limit results
    return data.content
      .filter(news => news.id !== newsId)
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching related news:', error)
    throw error
  }
}

