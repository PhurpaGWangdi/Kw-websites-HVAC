import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
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
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;