import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CTASection } from '@/components/ui/cta-with-glow';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent } from '../utils/helpers';

const HVACCTASection: React.FC = () => {
  const { language } = useLanguage();
  const copy = COPY[language];

  const handleEmergencyCall = () => {
    logEvent('cta_emergency_call', { location: 'cta_section' });
    window.location.href = `tel:${CONFIG.brand.phone}`;
  };

  return (
    <CTASection
      title={language === 'en' 
        ? "Need Emergency AC Repair? We're Available 24/7" 
        : "تحتاج إصلاح تكييف طارئ؟ نحن متاحون ٢٤/٧"
      }
      action={{
        text: language === 'en' ? "Call Emergency Line" : "اتصل بخط الطوارئ",
        href: `tel:${CONFIG.brand.phone}`,
        variant: "glow"
      }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white"
    />
  );
};

export default HVACCTASection;