import React from 'react';
import { Phone, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent } from '../utils/helpers';

const MobileCTA: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const handleCall = () => {
    logEvent('cta_call', { location: 'mobile_sticky' });
  };

  const handleWhatsApp = () => {
    logEvent('cta_whatsapp', { location: 'mobile_sticky' });
    const message = `Hello! I need HVAC service. Please contact me.`;
    window.open(`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 
                    shadow-lg z-50 safe-area-inset-bottom">
      <div className="px-4 py-3">
        {/* Business Hours */}
        <div className={`flex items-center justify-center text-xs text-gray-600 mb-3 
                        ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Clock className="w-4 h-4 mr-2" />
          <span>{CONFIG.businessHours}</span>
        </div>

        {/* CTA Buttons */}
        <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'grid-flow-col-dense' : ''}`}>
          <a
            href={`tel:${CONFIG.brand.phone}`}
            onClick={handleCall}
            className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white 
                     rounded-xl font-semibold transition-colors duration-200 active:bg-emerald-700
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                     active:scale-95"
          >
            <Phone className="w-5 h-5 mr-2" />
            {copy.callNow}
          </a>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center px-4 py-3 border-2 border-emerald-600 
                     text-emerald-600 rounded-xl font-semibold transition-colors duration-200 
                     active:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                     focus:ring-offset-2 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {copy.whatsappNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCTA;