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
        <div className="mt-3 w-full h-32 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
}

const IMAGES = {
  hero: "/images/hero.jpg",
  cooling: "/images/cooling.jpg",
  heating: "/images/heating.jpg",
  maintenance: "/images/maintenance.jpg",
  commercial: "/images/commercial.jpg",
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