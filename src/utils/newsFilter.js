// Filter news based on language availability and sort by date (newest first)
export const filterNewsByLanguage = (newsArray, isArabic) => {
  if (!newsArray || newsArray.length === 0) return []
  
  return newsArray
    .filter(news => {
      if (isArabic) {
        // For Arabic, check if titleAr exists and is not empty
        return news.titleAr && news.titleAr.trim() !== ''
      } else {
        // For English, check if title exists and is not empty
        return news.title && news.title.trim() !== ''
      }
    })
    .sort((a, b) => {
      // Sort by date, newest first
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB - dateA // Descending order (newest first)
    })
}

