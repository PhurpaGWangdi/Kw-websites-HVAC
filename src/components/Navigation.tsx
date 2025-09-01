import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent } from '../utils/helpers';
import LanguageToggle from './LanguageToggle';

const Navigation: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const handleCall = () => {
    logEvent('cta_call', { location: 'navigation' });
  };

  const handleWhatsApp = () => {
    logEvent('cta_whatsapp', { location: 'navigation' });
    const message = `Hello! I need HVAC service. Please contact me.`;
    window.open(`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="text-xl font-bold text-emerald-600">
              {language === 'en' ? CONFIG.brand.nameEn : CONFIG.brand.nameAr}
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors">
              {copy.navServices}
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors">
              {copy.navPricing}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              {copy.navContact}
            </a>
            <LanguageToggle />
          </div>

          {/* CTA Buttons - Desktop */}
          <div className={`hidden md:flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <a
              href={`tel:${CONFIG.brand.phone}`}
              onClick={handleCall}
              className="flex items-center px-4 py-2 text-emerald-600 border border-emerald-600 
                         rounded-lg hover:bg-emerald-50 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <Phone className="w-4 h-4 mr-2" />
              {copy.callNow}
            </a>
            <button
              onClick={handleWhatsApp}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white 
                         rounded-lg hover:bg-emerald-700 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {copy.whatsappNow}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;