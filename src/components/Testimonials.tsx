import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { COPY } from '../config/brand';

const Testimonials: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

  const testimonials = [
    {
      quote: copy.testimonial1,
      name: "Maha A.",
      area: "Salmiya"
    },
    {
      quote: copy.testimonial2,
      name: "Yousef K.",
      area: "Hawally"
    },
    {
      quote: copy.testimonial3,
      name: "Noura S.",
      area: "Fintas"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {copy.testimonialsTitle}
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 mt-6"
            initial={{ x: 0 }}
            animate={{ x: [0, -320, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((c, i) => (
              <div key={i} className="min-w-[300px] rounded-2xl p-5 border bg-white shadow-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor"/>)}
                </div>
                <p className="mt-3 text-slate-700">"{c.quote}"</p>
                <div className="mt-3 text-sm text-emerald-700 font-semibold">{c.name} ({c.area})</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;