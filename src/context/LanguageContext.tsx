import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  translations,
} from '../i18n/translations';
import type { Language, Translation } from '../i18n/translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Current locale's translation dictionary. */
  t: Translation;
}

const STORAGE_KEY = 'language';

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const isSupported = (value: string | null): value is Language =>
  LANGUAGES.some((lang) => lang.code === value);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(stored) ? stored : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Reflect the active language on <html lang> for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Explicit user choices are persisted so they survive reloads.
  const setLanguage = (next: Language) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLanguageState(next);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
