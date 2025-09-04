import React from 'react';
import { Phone, MessageCircle, CheckCircle, Snowflake, Flame, Fan, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent, cn } from '../utils/helpers';

// Central image map (avoids path typos)
const IMAGES = {
  hero: "https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg",
  cooling: "https://images.pexels.com/photos/2078768/pexels-photo-2078768.jpeg",
  heating: "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg",
  maintenance: "https://images.pexels.com/photos/5691569/pexels-photo-5691569.jpeg",
  commercial: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
};

function SplineEmbed({ scene, className = "" }) {
  // load the web component script once
  React.useEffect(() => {
    const id = "spline-viewer-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.type = "module";
      s.src = "https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js";
      document.head.appendChild(s);
    }
  }, []);
  if (!scene) return null;
  return (
    <div className={cn("rounded-[32px] shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white/60 backdrop-blur", className)}>
      {/* @ts-ignore: custom element */}
      <spline-viewer
        loading="lazy"
        style={{ width: "100%", height: "100%", display: "block" }}
        url={scene}
        ar
        orbit
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc, image }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-5 border rounded-3xl bg-white/70 backdrop-blur shadow-sm hover:shadow-xl transition"
    >
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-50 to-sky-50 flex items-center justify-center text-emerald-700 shadow-inner border">
        {icon}
      </div>
      <h4 className="mt-4 font-semibold text-lg tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</p>

      {image && (
        <div className="mt-3 w-full h-28 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if path wrong
              e.currentTarget.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'>
                   <rect width='100%' height='100%' fill='#f1f5f9'/>
                   <text x='50%' y='50%' font-size='16' text-anchor='middle' fill='#64748b'>Image not found</text>
                 </svg>`
              );
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = Object.values(IMAGES);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [images.length]);
  
  return (
    <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-black/5 relative">
      {images.map((image, index) => (
        <motion.img
          key={image}
          src={image}
          alt="HVAC services in Kuwait"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                           active:scale-95"
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
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                           active:scale-95"
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src="/images/hero.jpg"
                  alt="HVAC technician repairing AC"
                  className="w-full h-full object-cover"
                />
               <div className="absolute inset-0 bg-black/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;