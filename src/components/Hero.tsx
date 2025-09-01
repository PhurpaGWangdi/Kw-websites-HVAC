import React from 'react';
import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent } from '../utils/helpers';

const Hero: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const handleCall = () => {
    logEvent('cta_call', { location: 'hero' });
  };

  const handleWhatsApp = () => {
    logEvent('cta_whatsapp', { location: 'hero' });
    const message = `Hi! I need HVAC service in Kuwait. Please contact me for booking.`;
    window.open(`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.3) 1px, transparent 0)`
             }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={isRTL ? 'lg:order-2' : ''}
          >
            {/* Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 
                         rounded-full text-sm font-medium mb-6"
            >
              {copy.heroBadges}
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {copy.heroTitle}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {copy.heroSubtitle}
            </motion.p>

            {/* Feature Points */}
            <motion.ul 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3 mb-8"
            >
              {copy.heroPoints.map((point, index) => (
                <li key={index} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <a
                href={`tel:${CONFIG.brand.phone}`}
                onClick={handleCall}
                className="flex items-center justify-center px-8 py-4 bg-emerald-600 text-white 
                           rounded-xl hover:bg-emerald-700 transition-all duration-200 text-lg font-semibold
                           shadow-lg hover:shadow-xl transform hover:-translate-y-1
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Phone className="w-5 h-5 mr-3" />
                {copy.callNow}
              </a>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center px-8 py-4 bg-white text-emerald-600 
                           border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 
                           transition-all duration-200 text-lg font-semibold
                           shadow-lg hover:shadow-xl transform hover:-translate-y-1
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                {copy.whatsappNow}
              </button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            initial={{ x: isRTL ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`${isRTL ? 'lg:order-1' : ''} flex justify-center`}
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-emerald-400 to-emerald-600 
                              rounded-full opacity-10 absolute -top-10 -left-10" />
              <div className="w-64 h-64 bg-gradient-to-br from-emerald-500 to-emerald-700 
                              rounded-2xl shadow-2xl flex items-center justify-center relative z-10">
                <div className="text-6xl">❄️</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;