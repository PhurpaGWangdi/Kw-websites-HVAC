import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';
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

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <div className="relative min-h-screen overflow-x-hidden text-slate-800 bg-[radial-gradient(1200px_600px_at_-10%_-20%,#ccfbf1_0%,transparent_60%),radial-gradient(800px_400px_at_110%_10%,#e0f2fe_0%,transparent_55%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
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
                <a href={`tel:${CONFIG.brand.phone}`} className="inline-flex items-center gap-1 bg-emerald-600 text-white px-3 py-2 rounded-full shadow"><Phone size={16}/> Call</a>
                <a href={`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent('Hi, I need AC service.')}`} className="inline-flex items-center gap-1 border px-3 py-2 rounded-full shadow"><MessageCircle size={16}/> WA</a>
              </div>
            </div>
          </motion.div>
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;