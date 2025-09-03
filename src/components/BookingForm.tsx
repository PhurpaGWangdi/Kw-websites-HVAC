import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CONFIG, COPY } from '../config/brand';
import { FormData, WebhookPayload } from '../types';
import { getUtmParams, generateIdempotencyKey, logEvent, digitsOnly } from '../utils/helpers';

const BookingForm: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = COPY[language];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    urgency: '',
    address: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const utmParams = getUtmParams();
      const idempotencyKey = generateIdempotencyKey(formData.phone, formData.service);
      
      const payload: WebhookPayload = {
        ...formData,
        lang: language,
        source: 'website',
        timestamp: new Date().toISOString(),
        page: window.location.href,
        idempotencyKey,
        ...utmParams
      };

      const response = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        logEvent('lead_submit_success', { service: formData.service, city: formData.city });
        
        // Reset form
        setFormData({
          name: '', phone: '', email: '', city: '', service: '', 
          urgency: '', address: '', notes: ''
        });

        // Open WhatsApp with lead summary
        const whatsappMessage = `New HVAC Lead:
${formData.name} — ${formData.phone}
${formData.service} @ ${formData.city}
${formData.notes || 'No additional notes'}`;

        setTimeout(() => {
          window.open(`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        }, 1000);
        
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      logEvent('lead_submit_error', { error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    copy.serviceCooling,
    copy.serviceHeating,
    copy.serviceMaintenance,
    copy.serviceCommercial
  ];

  const urgencyOptions = [
    { value: 'now', label: copy.urgencyNow },
    { value: 'today', label: copy.urgencyToday },
    { value: 'week', label: copy.urgencyWeek }
  ];

  return (
    <section id="contact" className="py-20 bg-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {copy.bookingTitle}
          </h2>
          <p className="text-xl text-gray-600">
            {copy.bookingSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-emerald-800 font-medium">{copy.formSuccess}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 font-medium">{copy.formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formName} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formPhone} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formCity} *
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                >
                  <option value="">Select area</option>
                  {CONFIG.serviceAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formService}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                >
                  <option value="">Select service</option>
                  {serviceOptions.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                  {copy.formUrgency}
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition-colors duration-200"
                >
                  <option value="">Select timeframe</option>
                  {urgencyOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                {copy.formAddress}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         transition-colors duration-200"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                {copy.formNotes}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         transition-colors duration-200 resize-none"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-8 py-4 bg-emerald-600 
                       text-white rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400
                       transition-all duration-200 text-lg font-semibold shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                       transition active:scale-95"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <Send className="w-5 h-5 mr-3" />
              )}
              {isSubmitting ? 'Submitting...' : copy.formSubmit}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              {copy.formPrivacy}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;