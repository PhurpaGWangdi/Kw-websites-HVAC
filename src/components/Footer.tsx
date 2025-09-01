import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';

const Footer: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-6">{copy.footerContact}</h3>
            <div className="space-y-4">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>{CONFIG.brand.phone}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                <span>{CONFIG.brand.email}</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-6">{copy.footerHours}</h3>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
              <span>{CONFIG.businessHours}</span>
            </div>
          </div>

          {/* Service Areas */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold mb-6">{copy.footerAreas}</h3>
            <div className="grid grid-cols-2 gap-2">
              {CONFIG.serviceAreas.map(area => (
                <div key={area} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="text-2xl font-bold text-emerald-400 mb-4">
            {language === 'en' ? CONFIG.brand.nameEn : CONFIG.brand.nameAr}
          </div>
          <p className="text-gray-400">
            © 2025 {CONFIG.brand.nameEn}. {copy.footerRights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;