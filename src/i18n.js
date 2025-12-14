import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      categories: 'Categories',
      about: 'About',
      language: 'Language',
      search: 'Search',
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
      followUs: 'Follow Us',
      
      // Breadcrumb
      homeLink: 'Home',
      
      // Misc
      showing: 'Showing',
      of: 'of',
      articles: 'articles',
      noNewsFound: 'No news found',
      
      // About Page
      aboutSubtitle: 'Your Trusted Source for Quality News',
      whoWeAre: 'Who We Are',
      aboutDescription1: 'News Portal is your premier destination for comprehensive, accurate, and timely news coverage. We are dedicated to bringing you the most important stories from around the world, delivered with integrity and professionalism.',
      aboutDescription2: 'Our team of experienced journalists and content creators work tirelessly to ensure you stay informed about the topics that matter most. From breaking news to in-depth analysis, we cover a wide spectrum of categories to meet your diverse interests.',
      aboutDescription3: 'Built with cutting-edge technology including React, Vite, and Material UI, our platform offers a seamless, fast, and beautiful user experience across all devices.',
      ourVision: 'Our Vision',
      visionText: 'To be the world\'s most trusted and innovative digital news platform, empowering people with knowledge and insights.',
      ourMission: 'Our Mission',
      missionText: 'To deliver accurate, unbiased, and engaging news content that informs, educates, and inspires our global audience.',
      ourValues: 'Our Values',
      valuesText: 'Integrity, accuracy, transparency, and innovation are at the core of everything we do.',
      whatWeCover: 'What We Cover',
      
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
      footerDescription: 'مصدرك الموثوق لآخر الأخبار والتحديثات عبر فئات متعددة.',
      quickLinks: 'روابط سريعة',
      company: 'الشركة',
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      followUs: 'تابعنا',
      
      // Breadcrumb
      homeLink: 'الرئيسية',
      
      // Misc
      showing: 'عرض',
      of: 'من',
      articles: 'مقالات',
      noNewsFound: 'لا توجد أخبار',
      
      // About Page
      aboutSubtitle: 'مصدرك الموثوق للأخبار عالية الجودة',
      whoWeAre: 'من نحن',
      aboutDescription1: 'بوابة الأخبار هي وجهتك الأولى للحصول على تغطية إخبارية شاملة ودقيقة وفي الوقت المناسب. نحن ملتزمون بتقديم أهم القصص من جميع أنحاء العالم، بنزاهة واحترافية.',
      aboutDescription2: 'يعمل فريقنا من الصحفيين ومنشئي المحتوى ذوي الخبرة بلا كلل لضمان بقائك على اطلاع بالموضوعات الأكثر أهمية. من الأخبار العاجلة إلى التحليل المتعمق، نغطي طيفاً واسعاً من الفئات لتلبية اهتماماتك المتنوعة.',
      aboutDescription3: 'تم بناء منصتنا باستخدام أحدث التقنيات بما في ذلك React و Vite و Material UI، مما يوفر تجربة مستخدم سلسة وسريعة وجميلة على جميع الأجهزة.',
      ourVision: 'رؤيتنا',
      visionText: 'أن نكون منصة الأخبار الرقمية الأكثر موثوقية وابتكاراً في العالم، تمكين الناس بالمعرفة والرؤى.',
      ourMission: 'مهمتنا',
      missionText: 'تقديم محتوى إخباري دقيق وغير متحيز وجذاب يُعلم ويثقف ويلهم جمهورنا العالمي.',
      ourValues: 'قيمنا',
      valuesText: 'النزاهة والدقة والشفافية والابتكار هي جوهر كل ما نقوم به.',
      whatWeCover: 'ما نغطيه',
      
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

