import React from 'react';
import { Phone, MessageCircle, CheckCircle, Snowflake, Flame, Fan, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { digitsOnly, logEvent, cn } from '../utils/helpers';

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

function FeatureCard({icon, title, desc, image}){
  return (
    <motion.div whileHover={{y:-4, scale:1.02}} className="p-5 border rounded-3xl bg-white/70 backdrop-blur shadow-sm hover:shadow-xl transition">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-50 to-sky-50 flex items-center justify-center text-emerald-700 shadow-inner border">
        {icon}
      </div>
      <h4 className="mt-4 font-semibold text-lg tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</p>
      {image && (
        <img
          src={image}
          alt={title}
          className="mt-3 w-full h-28 object-cover rounded-xl"
          loading="lazy"
        />
      )}
    </motion.div>
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
            <motion.div initial={{opacity:0, scale:0.96}} animate={{opacity:1, scale:1}} transition={{duration:0.8}} className="relative">
              {CONFIG.splineScene ? (
                // 3D Spline hero
                <div className="aspect-[4/3]">
                  <SplineEmbed scene={CONFIG.splineScene} className="h-full w-full" />
                </div>
              ) : (
                // Fallback: service feature cards
                <div className="aspect-[4/3] rounded-[32px] bg-white/60 backdrop-blur p-2 shadow-2xl ring-1 ring-black/5">
                  <div className="h-full w-full rounded-[28px] bg-gradient-to-br from-sky-50 to-emerald-50 grid grid-cols-2 gap-2 p-3">
                    <FeatureCard
                      icon={<Snowflake/>}
                      title={copy.serviceCooling}
                      desc={copy.serviceCoolingDesc}
                      image="/images/cooling-unit.jpg"
                    />
                    <FeatureCard
                      icon={<Flame/>}
                      title={copy.serviceHeating}
                      desc={copy.serviceHeatingDesc}
                      image="/images/hvac-tech.jpg"
                    />
                    <FeatureCard
                      icon={<Fan/>}
                      title={copy.serviceMaintenance}
                      desc={copy.serviceMaintenanceDesc}
                      image="/images/hvac-tech.jpg (technician repairing AC)2.jpg"
                    />
                    <FeatureCard
                      icon={<Building2/>}
                      title={copy.serviceCommercial}
                      desc={copy.serviceCommercialDesc}
                      image="/images/hvac-tech.jpg (technician repairing AC)3.jpg"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;