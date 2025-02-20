import en from './en';

export const translations = {
  en,
};

export const getTranslation = (language = 'en') => {
  return translations[language] || translations.en;
};
