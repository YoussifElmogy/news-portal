// Filter news based on language availability
export const filterNewsByLanguage = (newsArray, isArabic) => {
  if (!newsArray || newsArray.length === 0) return []
  
  return newsArray.filter(news => {
    if (isArabic) {
      // For Arabic, check if titleAr exists and is not empty
      return news.titleAr && news.titleAr.trim() !== ''
    } else {
      // For English, check if title exists and is not empty
      return news.title && news.title.trim() !== ''
    }
  })
}

