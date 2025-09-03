import React from 'react';
import { Search, Wrench, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { COPY } from '../config/brand';

const Pricing: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const pricingTiers = [
    {
      icon: Search,
      title: copy.pricingDiagnosis,
      price: copy.pricingDiagnosisPrice,
      description: copy.pricingDiagnosisDesc,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Wrench,
      title: copy.pricingTuneup,
      price: copy.pricingTuneupPrice,
      description: copy.pricingTuneupDesc,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Zap,
      title: copy.pricingEmergency,
      price: copy.pricingEmergencyPrice,
      description: copy.pricingEmergencyDesc,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {copy.pricingTitle}
          </h2>
          <p className="text-xl text-gray-600">
            {copy.pricingSubtitle}
          </p>
        </motion.div>

        <div className={`grid md:grid-cols-3 gap-8 mb-8 ${language === 'ar' ? 'text-right' : ''}`}>
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 
                         transition-all duration-300 text-center
                         hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-emerald-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                              ${tier.bgColor} mb-6`}>
                <tier.icon className={`w-8 h-8 ${tier.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tier.title}
              </h3>
              <div className="text-3xl font-bold text-emerald-600 mb-4">
                {tier.price}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm"
        >
          {copy.pricingNote}
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;