import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG } from '../config/brand';

const SEO: React.FC = () => {
  const { language } = useLanguage();

  const seoData = {
    en: {
      title: "AC Repair Kuwait — Same-Day HVAC Service | KwCool",
      description: "Licensed HVAC technicians in Kuwait. Fast 30–90 min response. Transparent pricing, warranty, and KNET accepted. Call or WhatsApp to book.",
      keywords: "AC repair Kuwait, HVAC service Kuwait, air conditioning repair, same day AC repair, Kuwait HVAC technician"
    },
    ar: {
      title: "تصليح تكييف الكويت | خدمة نفس اليوم | كيو كول للتكييف",
      description: "تصليح وصيانة تكييف احترافي في الكويت. فنيون مرخصون، أسعار شفافة، خدمة نفس اليوم. اتصل 5000 0000 965+ لطوارئ التكييف.",
      keywords: "تصليح تكييف الكويت, خدمة تكييف الكويت, إصلاح مكيفات, تصليح تكييف نفس اليوم"
    }
  };

  const currentSEO = seoData[language];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": language === 'en' ? CONFIG.brand.nameEn : CONFIG.brand.nameAr,
    "telephone": CONFIG.brand.phone,
    "email": CONFIG.brand.email,
    "url": window.location.origin,
    "sameAs": `https://wa.me/${CONFIG.brand.whatsapp.replace(/\D/g, '')}`,
    "areaServed": CONFIG.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "openingHours": "Mo-Th 08:00-20:00,Sa-Su 08:00-20:00",
    "priceRange": "8-25 KWD",
    "serviceType": "HVAC Repair and Maintenance"
  };

  return (
    <Helmet>
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{currentSEO.title}</title>
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={currentSEO.title} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={currentSEO.title} />
      <meta name="twitter:description" content={currentSEO.description} />
      <link rel="canonical" href={window.location.href} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;