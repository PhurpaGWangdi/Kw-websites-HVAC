import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COPY } from '../config/brand';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const copy = COPY[language];

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="px-3 py-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 
                 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      {copy.langSwitch}
    </button>
  );
};

export default LanguageToggle;