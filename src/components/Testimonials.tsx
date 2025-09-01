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
      text: copy.testimonial1,
      author: copy.testimonial1Author
    },
    {
      text: copy.testimonial2,
      author: copy.testimonial2Author
    },
    {
      text: copy.testimonial3,
      author: copy.testimonial3Author
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              {/* Stars */}
              <div className={`flex mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className={`text-gray-700 mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                "{testimonial.text}"
              </blockquote>
              
              {/* Author */}
              <cite className={`text-emerald-600 font-semibold not-italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {testimonial.author}
              </cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;