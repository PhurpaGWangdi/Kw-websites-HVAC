import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CONFIG } from './config/brand';
import { digitsOnly } from './utils/helpers';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Trust from './components/Trust';
import Pricing from './components/Pricing';
import Areas from './components/Areas';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import SEO from './components/SEO';

const AppContent: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    (window as any).VG_CONFIG = {
      ID: "yhy7drwv11xp9pm1",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };

    const script = document.createElement("script");
    script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    const container = document.createElement("div");
    container.id = "VG_OVERLAY_CONTAINER";
    container.style.width = "0";
    container.style.height = "0";
    document.body.appendChild(container);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);
  
  return (
        <div dir={language === "ar" ? "rtl" : "ltr"} className="relative min-h-screen overflow-x-hidden text-slate-800 bg-[radial-gradient(1200px_600px_at_-10%_-20%,#ccfbf1_0%,transparent_60%),radial-gradient(800px_400px_at_110%_10%,#e0f2fe_0%,transparent_55%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
          <SEO />
          <Navigation />
          <Hero />
          <Services />
          <Trust />
          <Pricing />
          <Areas />
          <Testimonials />
          <FAQ />
          <BookingForm />
          <Footer />
          <MobileCTA />
          
          {/* SEO: LocalBusiness */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context":"https://schema.org",
              "@type":"HVACBusiness",
              name: language==='en'? CONFIG.brand.nameEn : CONFIG.brand.nameAr,
              telephone: CONFIG.brand.phone,
              email: CONFIG.brand.email,
              areaServed: CONFIG.serviceAreas,
              openingHours: CONFIG.businessHours,
              sameAs: [`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}`]
            }) }}
          />

          {/* Sticky CTA (mobile) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-3"
          >
            <div className="bg-white/90 backdrop-blur border shadow-2xl rounded-full flex items-center justify-between p-2 pl-4">
              <div className="text-sm">
                <div className="font-semibold">AC Service — Same-Day</div>
                <div className="text-slate-500">Sat–Thu 8:00–20:00</div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${CONFIG.brand.phone}`} className="inline-flex items-center gap-1 bg-emerald-600 text-white px-3 py-2 rounded-full shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Phone size={16}/> Call</a>
                <a href={`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent('Hi, I need AC service.')}`} className="inline-flex items-center gap-1 border px-3 py-2 rounded-full shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><MessageCircle size={16}/> WA</a>
              </div>
            </div>
          </motion.div>
        </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;