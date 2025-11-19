# News Portal 📰

A modern, fully-featured news portal web application built with React, Vite, and Material UI. Features multi-language support (English & Arabic), dynamic theming, category-based news filtering, and responsive design.

## 🚀 Features

### Core Features
- **Multi-Language Support** - Full support for English and Arabic with RTL (Right-to-Left) layout
- **Dynamic Primary Color** - Customizable theme color system
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Category-Based Navigation** - News organized by Entertainment, Business, Technology, Sports, and Health
- **Pagination** - Efficient news browsing with paginated lists
- **Single News View** - Detailed article pages with related news
- **Breadcrumb Navigation** - Easy navigation with breadcrumb trails
- **SEO-Friendly** - Semantic HTML and proper routing structure

### Technical Features
- **React 19** - Latest version with improved performance
- **Vite 7** - Lightning-fast build tool and dev server
- **Material UI v7** - Beautiful Material Design components
- **React Router** - Client-side routing
- **i18next** - Internationalization framework
- **Context API** - State management for theme and categories
- **Emotion** - CSS-in-JS styling with RTL support

## 📦 Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **UI Library:** Material UI (MUI) v7
- **Routing:** React Router DOM v6
- **i18n:** i18next & react-i18next
- **Styling:** Emotion (CSS-in-JS) with RTL support
- **Icons:** Material Icons
- **Fonts:** Open Sans (English), Cairo (Arabic)

## 🛠️ Installation

The project is already set up with all dependencies installed. If you need to reinstall:

```bash
npm install
```

## 🏃 Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Customization

### Changing Primary Color

The primary color is managed through the `ThemeContext`. To change it:

1. **Default Color:** Edit `src/contexts/ThemeContext.jsx`:

```javascript
const [primaryColor, setPrimaryColor] = useState('#1976d2') // Change this value
```

2. **Dynamic Color Change:** Use the `useThemeContext` hook in any component:

```javascript
import { useThemeContext } from './contexts/ThemeContext'

function MyComponent() {
  const { primaryColor, setPrimaryColor } = useThemeContext()
  
  const handleColorChange = (newColor) => {
    setPrimaryColor(newColor)
  }
  
  return (
    <button onClick={() => handleColorChange('#ff5722')}>
      Change Theme Color
    </button>
  )
}
```

### Adding New Categories

1. Update `src/contexts/CategoriesContext.jsx`:

```javascript
const [categories] = useState([
  // ... existing categories
  { id: 'politics', nameKey: 'politics', slug: 'politics' },
])
```

2. Add translations in `src/i18n.js`:

```javascript
// English
politics: 'Politics',

// Arabic
politics: 'السياسة',
```

3. Add news items in `src/data/mockNews.js` with the new category.

### Connecting to Backend API

Replace the mock data in `src/data/mockNews.js` with API calls:

```javascript
// Example API integration
export const getNewsByCategory = async (category, limit = null) => {
  const response = await fetch(`/api/news?category=${category}&limit=${limit}`)
  return await response.json()
}
```

## 📄 Project Structure

```
news-portal/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── NewsCard.jsx
│   ├── contexts/        # React Context providers
│   │   ├── CategoriesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/            # Mock data (replace with API)
│   │   └── mockNews.js
│   ├── pages/           # Page components
│   │   ├── AboutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NewsCategory.jsx
│   │   └── SingleNews.jsx
│   ├── App.jsx          # Main app with routing
│   ├── i18n.js          # i18n configuration
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🌐 Multi-Language Support

### Switching Languages

The language switcher is in the navbar. Users can toggle between English (EN) and Arabic (AR).

### Adding New Languages

1. Add translations in `src/i18n.js`:

```javascript
const resources = {
  en: { /* existing */ },
  ar: { /* existing */ },
  fr: {
    translation: {
      home: 'Accueil',
      // ... more translations
    }
  }
}
```

2. Update the language selector in `src/components/Navbar.jsx`.

## 🗂️ Routes

- `/` - Home page with latest news from all categories
- `/news?category={slug}` - News listing by category with pagination
- `/news/:id` - Single news article view
- `/about` - About page

## 📱 Responsive Breakpoints

The application uses Material UI's responsive breakpoints:

- **xs** (0px+) - Mobile phones
- **sm** (600px+) - Tablets
- **md** (900px+) - Small laptops
- **lg** (1200px+) - Desktops
- **xl** (1536px+) - Large screens

## 🎯 Key Components

### NewsCard
Displays a news article preview with image, title, description, category chip, and date.

### Layout
Main layout wrapper with Navbar and Footer.

### HomePage
Landing page showing latest news and category sections (4 items each).

### NewsCategory
Dynamic page for listing all news in a category with pagination, breadcrumb, and header image.

### SingleNews
Detailed article view with full content, metadata, and related news.

## 🔧 Configuration

### Vite Configuration
See `vite.config.js` for build and dev server settings.

### Theme Configuration
Theme settings are in `src/contexts/ThemeContext.jsx` including:
- Primary/Secondary colors
- RTL/LTR direction
- Font families (Open Sans for English, Cairo for Arabic)

### i18n Configuration
Language settings in `src/i18n.js`:
- Language detection
- Fallback language (English)
- Translation resources

## 🚀 Deployment

Build for production:

```bash
npm run build
```

The build output will be in the `dist` folder, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🔜 Backend Integration

To connect with a backend:

1. **Update Mock Data Functions:** Replace functions in `src/data/mockNews.js` with API calls
2. **Add Loading States:** Implement loading indicators in components
3. **Error Handling:** Add error boundaries and error messages
4. **Authentication:** Implement user authentication if needed
5. **Dynamic Categories:** Fetch categories from API in `CategoriesContext`

Example API integration:

```javascript
// src/api/newsApi.js
const API_BASE_URL = process.env.VITE_API_URL

export const fetchNewsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/news?category=${category}`)
  if (!response.ok) throw new Error('Failed to fetch news')
  return response.json()
}
```

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Material UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [i18next Documentation](https://www.i18next.com/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React, Vite & Material UI**
