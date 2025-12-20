import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const useCurrentLang = () => {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  return lang || i18n.language || 'en'
}

