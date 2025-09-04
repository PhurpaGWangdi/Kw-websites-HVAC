import React from 'react';
import { Snowflake, Flame, Fan, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';

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

const IMAGES = {
  hero: "https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg",
  cooling: "https://images.pexels.com/photos/2078768/pexels-photo-2078768.jpeg",
  heating: "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg",
  maintenance: "https://images.pexels.com/photos/5691569/pexels-photo-5691569.jpeg",
  commercial: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
};

const Services: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const services = [
    {
      icon: Snowflake,
      title: copy.serviceCooling,
      description: copy.serviceCoolingDesc,
      color: 'text-blue-500',
      image: IMAGES.cooling
    },
    {
      icon: Flame,
      title: copy.serviceHeating,
      description: copy.serviceHeatingDesc,
      color: 'text-orange-500',
      image: IMAGES.heating
    },
    {
      icon: Fan,
      title: copy.serviceMaintenance,
      description: copy.serviceMaintenanceDesc,
      color: 'text-emerald-500',
      image: IMAGES.maintenance
    },
    {
      icon: Building2,
      title: copy.serviceCommercial,
      description: copy.serviceCommercialDesc,
      color: 'text-purple-500',
      image: IMAGES.commercial
    }
  ];

  return (
    <section id="services" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DEBUG: remove later */}
        <pre className="text-[10px] text-slate-500">
          {JSON.stringify(IMAGES, null, 2)}
        </pre>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {copy.servicesTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {copy.servicesSubtitle}
          </p>
        </motion.div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${language === 'ar' ? 'text-right' : ''}`}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<service.icon className={`w-8 h-8 ${service.color}`} />}
                title={service.title}
                desc={service.description}
                image={service.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;