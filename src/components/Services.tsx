import React from 'react';
import { Snowflake, Flame, Fan, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';

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
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-emerald-200 
                         shadow-sm transition-all duration-300 text-center
                         hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-emerald-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                              bg-gray-50 group-hover:bg-emerald-50 transition-colors duration-300 mb-4`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 w-full h-28 rounded-xl overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;