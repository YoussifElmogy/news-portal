import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Get language from localStorage or default to 'en'
const getStoredLanguage = () => {
  return localStorage.getItem('language') || 'en'
}

// Get language from URL path
const getLanguageFromPath = () => {
  const path = window.location.pathname
  const match = path.match(/^\/(en|ar)(\/|$)/)
  return match ? match[1] : null
}

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      categories: 'Categories',
      about: 'About',
      language: 'Language',
      search: 'Search',
      menu: 'Menu',
      searchPlaceholder: 'Search for news...',
      searchHint: 'Press Enter to search',
      
      // Home Page
      allNews: 'News',
      viewAll: 'View All',
      latestNews: 'Latest News',
      readMore: 'Read More',
      
      // Categories
      business: 'Business',
      entertainment: 'Entertainment',
      lifestyle: 'Lifestyle',
      travel: 'Travel',
      sports: 'Sports',
      tech: 'Technology',
      opinions: 'Opinions',
      interviews: 'Interviews',
      
      // News Page
      news: 'News',
      newsTitle: '{{category}} News',
      allNewsTitle: 'All News',
      noNewsFound: 'No news found',
      results: 'results',
      
      // Search Page
      searchResults: 'Search Results',
      searchResultsFor: 'Search results for',
      noSearchResults: 'No results found',
      noSearchResultsDesc: 'Try different keywords or check your spelling',
      
      // Pagination
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      of: 'of',
      
      // Single News
      publishedOn: 'Published on',
      share: 'Share',
      relatedNews: 'Related News',
      notAvailableInLanguage: 'This news article is not available in English',
      
      // Footer
      footerText: '© 2025 All rights reserved',
      footerDescription: 'Your trusted source for the latest news and updates across multiple categories.',
      quickLinks: 'Quick Links',
      company: 'Company',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      advertise: 'Advertise with us',
      privacyNotice: 'Privacy Notice',
      followUs: 'Follow Us',
      
      // Breadcrumb
      homeLink: 'Home',
      
      // Misc
      showing: 'Showing',
      of: 'of',
      articles: 'articles',
      noNewsFound: 'No news found',
      
      // About Page
aboutContent: 'Al-Eqtisad is a Saudi news platform that captures the pulse of business and everyday life in the Kingdom. With the economy and business at the heart of our coverage, we also tell the stories shaping Saudi culture and modern lifestyle. Through a fast, digital-first approach and credible, value-driven content, Al-Eqtisad connects numbers with narratives, offering readers a clear perspective on a Kingdom evolving with confidence toward the future.',     
      // Advertise Page
      advertiseWithUs: 'Advertise With Us',
      advertiseDescription: 'Reach a regional audience of business leaders, decision-makers, and industry professionals across the Middle East. Contact us to learn more about our advertising opportunities.',
      contactUsForAdvertising: 'Contact Us for Advertising',
      
      // Privacy Page
      privacyContent: 'At Business Review, we are committed to protecting your privacy. This Privacy Notice explains how we collect, use, and safeguard your personal information when you visit our website. We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us. We use this information to provide our services, communicate with you, and improve your experience. We do not sell your personal information to third parties. We implement appropriate security measures to protect your data. By using our website, you consent to the practices described in this notice. For more information or questions about our privacy practices, please contact us.',
      
      // Contact Page
      contactDescription: 'Have a question, suggestion, or feedback? We\'d love to hear from you!',
      getInTouch: 'Get in Touch',
      contactInfo: 'Feel free to reach out to us through:',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      sendMessage: 'Send a Message',
      formDescription: 'Fill out the form below and we\'ll get back to you as soon as possible.',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      messageSent: 'Thank you! Your message has been sent successfully.',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      categories: 'الأقسام',
      about: 'عن الموقع',
      language: 'اللغة',
      search: 'بحث',
      menu: 'القائمة',
      searchPlaceholder: 'ابحث عن الأخبار...',
      searchHint: 'اضغط Enter للبحث',
      
      // Home Page
      allNews: 'الأخبار',
      viewAll: 'عرض الكل',
      latestNews: 'آخر الأخبار',
      readMore: 'اقرأ المزيد',
      
      // Categories
      business: 'الأعمال',
      entertainment: 'ترفيه',
      lifestyle: 'نمط الحياة',
      travel: 'السفر',
      sports: 'الرياضة',
      tech: 'التكنولوجيا',
      opinions: 'الآراء',
      interviews: 'المقابلات',
      
      // News Page
      news: 'الأخبار',
      newsTitle: 'أخبار {{category}}',
      allNewsTitle: 'جميع الأخبار',
      noNewsFound: 'لم يتم العثور على أخبار',
      results: 'نتيجة',
      
      // Search Page
      searchResults: 'نتائج البحث',
      searchResultsFor: 'نتائج البحث عن',
      noSearchResults: 'لم يتم العثور على نتائج',
      noSearchResultsDesc: 'جرب كلمات مفتاحية مختلفة أو تحقق من الإملاء',
      
      // Pagination
      previous: 'السابق',
      next: 'التالي',
      showing: 'عرض',
      of: 'من',
      
      // Single News
      publishedOn: 'نشر في',
      share: 'مشاركة',
      relatedNews: 'أخبار ذات صلة',
      notAvailableInLanguage: 'هذا الخبر غير متوفر باللغة العربية',
      
      // Footer
      footerText: '© 2025 جميع الحقوق محفوظة',
      footerDescription: 'مجلة بزنس ريفيو هي منصة رقمية إقليمية تنقل محادثات الأعمال في الشرق الأوسط إلى الحياة. من التطورات المؤسسية واتجاهات السوق إلى نمط الحياة والترفيه والسفر، نغطي القطاعات التي تشكل كيفية نمو المنطقة وابتكارها واتصالها بالعالم.',
      quickLinks: 'روابط سريعة',
      company: 'الشركة',
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      advertise: 'أعلن معنا',
      privacyNotice: 'سياسة الخصوصية',
      followUs: 'تابعنا',
      
      // Breadcrumb
      homeLink: 'الرئيسية',
      
      // Misc
      showing: 'عرض',
      of: 'من',
      articles: 'مقالات',
      noNewsFound: 'لا توجد أخبار',
      
      // About Page
aboutContent:'الاقتصاد منصة إخبارية سعودية تُغطي نبض الأعمال والحياة اليومية في المملكة. وبينما نُركز على الاقتصاد والأعمال، فإننا نسلط الضوء أيضًا على القصص التي تُشكل الثقافة السعودية وأسلوب الحياة العصري. من خلال نهج سريع يعتمد على المحتوى الرقمي، ومحتوى موثوق وقيم، يربط الاقتصاد الأرقام بالقصص، مُقدمًا للقراء رؤية واضحة لمملكة تتطور بثقة نحو المستقبل.',      
      // Advertise Page
      advertiseWithUs: 'أعلن معنا',
      advertiseDescription: 'تواصل مع جمهور إقليمي من قادة الأعمال وصناع القرار والمحترفين في جميع أنحاء الشرق الأوسط. اتصل بنا لمعرفة المزيد عن فرص الإعلان لدينا.',
      contactUsForAdvertising: 'اتصل بنا للإعلان',
      
      // Privacy Page
      privacyContent: 'في بزنس ريفيو، نحن ملتزمون بحماية خصوصيتك. يشرح إشعار الخصوصية هذا كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها عند زيارة موقعنا الإلكتروني. نجمع المعلومات التي تقدمها لنا مباشرةً، مثل عند الاشتراك في نشرتنا الإخبارية أو الاتصال بنا. نستخدم هذه المعلومات لتقديم خدماتنا والتواصل معك وتحسين تجربتك. لا نبيع معلوماتك الشخصية لأطراف ثالثة. نطبق تدابير أمنية مناسبة لحماية بياناتك. باستخدام موقعنا، فإنك توافق على الممارسات الموضحة في هذا الإشعار. لمزيد من المعلومات أو الأسئلة حول ممارسات الخصوصية لدينا، يرجى الاتصال بنا.',
      
      // Contact Page
      contactDescription: 'هل لديك سؤال أو اقتراح أو ملاحظات؟ يسعدنا أن نسمع منك!',
      getInTouch: 'تواصل معنا',
      contactInfo: ':لا تتردد في التواصل معنا من خلال ',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      sendMessage: 'إرسال رسالة',
      formDescription: 'املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.',
      yourName: 'اسمك',
      yourEmail: 'بريدك الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      messageSent: 'شكراً لك! تم إرسال رسالتك بنجاح.',
    }
  }
}

// Initialize language (URL has priority over localStorage)
const initialLanguage = getLanguageFromPath() || getStoredLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng)
  // Update HTML attributes for RTL support
  document.documentElement.lang = lng
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
})

// Set initial HTML attributes
document.documentElement.lang = initialLanguage
document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr'

export default i18n

