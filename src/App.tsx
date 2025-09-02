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
        <div className="min-h-screen bg-white">
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