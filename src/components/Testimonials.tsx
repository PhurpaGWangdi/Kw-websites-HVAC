import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { COPY } from '../config/brand';

const Testimonials: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];

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
            {[...copy.testimonials, ...copy.testimonials].map((c, i) => (
              <div key={i} className="min-w-[300px] rounded-2xl p-5 border bg-white shadow-sm">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor"/>)}
                </div>

                {/* Quote */}
                <p className="mt-3 text-slate-700 leading-relaxed">"{c.quote}"</p>

                {/* Person row with avatar */}
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-100"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="text-sm">
                    <div className="font-semibold text-emerald-700">
                      {c.name} <span className="text-slate-500">({c.area})</span>
                    </div>
                    <div className="text-slate-500 text-xs">🇰🇼 Kuwait</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;