import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';

const Areas: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {copy.areasTitle}
          </h2>
          <p className="text-xl text-gray-600">
            {copy.areasSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONFIG.serviceAreas.map((area, index) => (
            <motion.div
              key={area}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className={`flex items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-emerald-300
                         ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <MapPin className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
              <span className="text-gray-800 font-medium">{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Areas;