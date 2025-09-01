import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Phone, Clock, MapPin, BadgeCheck, ArrowRight, ChevronDown,
  Snowflake, Flame, Fan, Shield, MessageSquare, Zap,
  Languages, Building2, Star, CreditCard, CheckCircle,
  Award, Users, Timer, Wrench
} from "lucide-react";

// === CONFIG ===
const CONFIG = {
  brand: {
    nameEn: "KwCool HVAC",
    nameAr: "كيو كول للتكييف",
    phone: "+965 5000 0000",
    whatsapp: "+96550000000",
    email: "book@kwcool.example",
  },
  serviceAreas: [
    "Kuwait City","Salmiya","Hawally","Farwaniya",
    "Jahra","Fintas","Fahaheel","Mangaf",
  ],
  webhookUrl: "https://hooks.make.com/REPLACE_WITH_YOUR_MAKE_WEBHOOK",
  businessHours: "Sat–Thu 8:00–20:00",
};

// === UTILS ===
const cn = (...classes) => classes.filter(Boolean).join(" ");
const digitsOnly = (s) => (s || "").replace(/[^\d]/g, "");

// === MAIN APP ===
export default function HVACKuwaitSite() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("hero");
  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = useMemo(() => translations[lang], [lang]);

  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Advanced scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);

  // Section tracking for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'pricing', 'booking', 'testimonials'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    const form = new FormData(formRef.current);
    const payload = Object.fromEntries(form.entries());
    payload.lang = lang;
    payload.source = "website";
    payload.timestamp = new Date().toISOString();

    // UTM tracking
    const usp = new URLSearchParams(window.location.search);
    const utm = {};
    for (const [k,v] of usp.entries()) if (k.startsWith("utm_")) utm[k] = v;
    payload.utm = utm;
    payload.page = window.location.pathname;

    try {
      const res = await fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      formRef.current.reset();

      // WhatsApp integration
      const wa = `https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(
        `${t.whatsAppLead}\n${payload.name} — ${payload.phone}\n${payload.service} @ ${payload.city}\n${payload.notes || ""}`
      )}`;
      setTimeout(() => window.open(wa, "_blank"), 1000);
      console.log("lead_submit_success", payload);
    } catch (err) {
      setError(t.errorMsg);
      console.error("lead_submit_error", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div dir={dir} className={cn(
      "relative min-h-screen overflow-x-hidden",
      lang === "ar" ? "font-arabic" : "font-sans"
    )}>
      {/* Advanced Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/80"
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
      </div>

      {/* Premium Navigation */}
      <Navigation lang={lang} setLang={setLang} t={t} activeSection={activeSection} />

      {/* Heat Alert Banner */}
      <HeatBanner lang={lang} />

      {/* Hero Section */}
      <motion.section 
        id="hero"
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-8 pb-20"
      >
        <HeroSection t={t} lang={lang} dir={dir} />
      </motion.section>

      {/* Services */}
      <section id="services" className="relative py-20">
        <ServicesSection t={t} dir={dir} />
      </section>

      {/* Trust Indicators */}
      <TrustSection t={t} dir={dir} />

      {/* Pricing */}
      <section id="pricing" className="relative py-20">
        <PricingSection t={t} dir={dir} />
      </section>

      {/* Booking Form */}
      <section id="booking" className="relative py-20">
        <BookingSection 
          t={t} 
          dir={dir} 
          formRef={formRef} 
          onSubmit={onSubmit}
          sending={sending}
          sent={sent}
          error={error}
        />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-20 bg-gradient-to-r from-slate-50 to-emerald-50/30">
        <TestimonialsSection t={t} dir={dir} />
      </section>

      {/* FAQ */}
      <FAQSection t={t} dir={dir} />

      {/* Footer */}
      <Footer t={t} lang={lang} />

      {/* Mobile Sticky CTA */}
      <MobileCTA t={t} />

      {/* JSON-LD */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(lang)) }} 
      />
    </div>
  );
}

// === COMPONENTS ===

function Navigation({ lang, setLang, t, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-emerald-100/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Snowflake className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {lang === "en" ? CONFIG.brand.nameEn : CONFIG.brand.nameAr}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['services', 'pricing', 'booking'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                  activeSection === section 
                    ? "text-emerald-600" 
                    : "text-slate-600 hover:text-emerald-600"
                )}
              >
                {t.nav[section]}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 
                         hover:text-emerald-600 bg-slate-100/80 hover:bg-emerald-50 rounded-xl 
                         transition-all duration-200 backdrop-blur-sm"
            >
              <Languages className="w-4 h-4" />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${CONFIG.brand.phone}`}
              onClick={() => console.log("cta_call", { location: "nav" })}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r 
                         from-emerald-600 to-cyan-600 text-white rounded-xl font-medium 
                         shadow-lg hover:shadow-glow transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{t.ctaCall}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeatBanner({ lang }) {
  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 border-b border-orange-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-2 text-sm font-medium text-orange-800">
          <motion.span 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-lg"
          >
            🔥
          </motion.span>
          <span>
            {lang === "en" 
              ? "Peak heat today in Kuwait — book early to secure a slot." 
              : "حرارة مرتفعة اليوم في الكويت — احجز مبكرًا لضمان الموعد."
            }
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection({ t, lang, dir }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("space-y-8", dir === "rtl" && "lg:order-2")}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-cyan-100 
                       text-emerald-800 px-4 py-2 rounded-full text-sm font-medium shadow-inner-glow"
          >
            <BadgeCheck className="w-4 h-4" />
            <span>{t.heroBadge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-black tracking-tight leading-none"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 
                           bg-clip-text text-transparent animate-shimmer bg-300%">
              {t.headline.split(" — ")[0]}
            </span>
            <br />
            <span className="text-slate-800 text-3xl lg:text-4xl font-bold">
              — {t.headline.split(" — ")[1]}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 leading-relaxed max-w-2xl"
          >
            {t.subhead}
          </motion.p>

          {/* Hero Points */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.heroPoints.map((point, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, x: dir === "rtl" ? -5 : 5 }}
                className={cn(
                  "flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100/50 shadow-sm",
                  dir === "rtl" && "flex-row-reverse space-x-reverse"
                )}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{point}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={cn("flex flex-col sm:flex-row gap-4", dir === "rtl" && "sm:flex-row-reverse")}
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${CONFIG.brand.phone}`}
              onClick={() => console.log("cta_call", { location: "hero" })}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-cyan-600 
                         text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl 
                         hover:shadow-glow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>{t.ctaCall}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}?text=${encodeURIComponent(t.whatsAppCta)}`}
              onClick={() => console.log("cta_whatsapp", { location: "hero" })}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 
                         text-emerald-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg 
                         hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.ctaWhatsApp}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Visual Element */}
        <motion.div 
          initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn("relative", dir === "rtl" && "lg:order-1")}
        >
          <HeroVisual t={t} />
        </motion.div>
      </div>
    </div>
  );
}

function HeroVisual({ t }) {
  return (
    <div className="relative">
      {/* Main Card */}
      <motion.div 
        whileHover={{ y: -10, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 
                     rounded-2xl flex items-center justify-center shadow-xl"
        >
          <Snowflake className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div 
          animate={{ y: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 
                     rounded-xl flex items-center justify-center shadow-lg"
        >
          <Flame className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-800">Kuwait HVAC</h3>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={<Timer />} value="30-90" label="Min Response" />
            <StatCard icon={<Award />} value="90 Day" label="Warranty" />
            <StatCard icon={<Users />} value="500+" label="Happy Clients" />
            <StatCard icon={<MapPin />} value="8" label="Areas Served" />
          </div>

          <div className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-100">
            <div className="flex items-center space-x-2 text-emerald-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Available Now</span>
            </div>
            <p className="text-sm text-emerald-600 mt-1">Emergency technicians on standby</p>
          </div>
        </div>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-[2rem] blur-xl -z-10" />
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="text-center p-3 bg-white/60 rounded-xl border border-slate-200/50"
    >
      <div className="flex justify-center mb-2 text-emerald-600">{icon}</div>
      <div className="text-lg font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </motion.div>
  );
}

function ServicesSection({ t, dir }) {
  const services = [
    { icon: <Snowflake />, title: t.services.cooling, desc: t.services.coolingDesc, color: "from-blue-500 to-cyan-500" },
    { icon: <Flame />, title: t.services.heating, desc: t.services.heatingDesc, color: "from-orange-500 to-red-500" },
    { icon: <Fan />, title: t.services.maintenance, desc: t.services.maintenanceDesc, color: "from-emerald-500 to-teal-500" },
    { icon: <Building2 />, title: t.services.commercial, desc: t.services.commercialDesc, color: "from-purple-500 to-indigo-500" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          {t.servicesTitle}
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          {t.servicesSubtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 
                       border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Gradient */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
              service.color
            )} />

            {/* Icon */}
            <div className={cn(
              "relative w-16 h-16 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
              service.color
            )}>
              <div className="text-white text-2xl">{service.icon}</div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {service.desc}
            </p>

            {/* Hover Effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 
                         transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrustSection({ t, dir }) {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.trust.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={cn(
                "flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-emerald-100/50",
                dir === "rtl" && "flex-row-reverse space-x-reverse"
              )}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection({ t, dir }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          {t.pricingTitle}
        </h2>
        <p className="text-xl text-slate-600">{t.pricingCopy}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {t.pricing.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={cn(
              "relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 border shadow-xl transition-all duration-500",
              index === 1 
                ? "border-emerald-300 shadow-glow ring-2 ring-emerald-200" 
                : "border-white/50 hover:border-emerald-200"
            )}
          >
            {/* Popular Badge */}
            {index === 1 && (
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-4 right-6 bg-gradient-to-r from-emerald-500 to-cyan-500 
                           text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                {dir === "rtl" ? "الأكثر طلبًا" : "Most Popular"}
              </motion.div>
            )}

            {/* Tier Name */}
            <div className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">
              {tier.tier}
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {tier.price}
              </span>
              <span className="text-lg text-slate-500 ml-1">{tier.unit}</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {tier.points.map((point, i) => (
                <li key={i} className={cn("flex items-center space-x-3", dir === "rtl" && "flex-row-reverse space-x-reverse")}>
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#booking"
              className="block w-full text-center bg-gradient-to-r from-emerald-600 to-cyan-600 
                         text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-glow 
                         transition-all duration-300"
            >
              {t.pricingCta}
            </motion.a>
          </motion.div>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-slate-500 text-sm mt-8"
      >
        {t.pricingNote}
      </motion.p>
    </div>
  );
}

function BookingSection({ t, dir, formRef, onSubmit, sending, sent, error }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={cn("space-y-8", dir === "rtl" && "lg:order-2")}
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.bookTitle}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {t.bookCopy}
            </p>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Service Areas</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CONFIG.serviceAreas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-2 p-3 bg-emerald-50/80 rounded-xl border border-emerald-100"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-700">{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={cn("relative", dir === "rtl" && "lg:order-1")}
        >
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Your Quote</h3>
              <p className="text-slate-600">Free diagnosis • No hidden fees</p>
            </div>

            {/* Success/Error States */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <p className="text-emerald-800 font-medium">{t.form.thanks}</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                >
                  <p className="text-red-800 font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput name="name" label={t.form.name} required placeholder={t.form.namePH} />
                <FormInput name="phone" label={t.form.phone} required placeholder="+965 5xxxxxxx" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput name="email" type="email" label={t.form.email} placeholder="you@email.com" />
                <FormSelect 
                  name="city" 
                  label={t.form.city} 
                  required 
                  options={CONFIG.serviceAreas}
                  placeholder={t.form.cityPH}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormSelect 
                  name="service" 
                  label={t.form.service} 
                  options={[t.services.cooling, t.services.heating, t.services.maintenance, t.services.commercial]}
                />
                <FormSelect 
                  name="urgency" 
                  label={t.form.urgency} 
                  options={[t.form.urgencies.now, t.form.urgencies.today, t.form.urgencies.thisWeek]}
                />
              </div>

              <FormInput name="address" label={t.form.address} placeholder={t.form.addressPH} />
              <FormTextarea name="notes" label={t.form.notes} placeholder={t.form.notesPH} />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sending}
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-cyan-600 
                           text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-glow-lg 
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-3">
                  {sending ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>{t.form.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.form.submit}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </motion.button>
            </form>

            <p className="mt-6 text-xs text-slate-500 text-center leading-relaxed">
              {t.privacy}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TestimonialsSection({ t, dir }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          {t.testiTitle}
        </h2>
        <p className="text-slate-600">{t.testiNote}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {t.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
          >
            {/* Stars */}
            <div className={cn("flex mb-6", dir === "rtl" && "flex-row-reverse")}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className={cn("text-slate-700 mb-6 leading-relaxed text-lg", dir === "rtl" && "text-right")}>
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className={cn("flex items-center space-x-3", dir === "rtl" && "flex-row-reverse space-x-reverse")}>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
              </div>
              <div>
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.area}</div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full opacity-50" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FAQSection({ t, dir }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm border-y border-emerald-100/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            {t.faqTitle}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {t.faq.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  "w-full px-8 py-6 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset",
                  dir === "rtl" && "text-right"
                )}
              >
                <div className={cn("flex items-center justify-between", dir === "rtl" && "flex-row-reverse")}>
                  <h3 className="text-lg font-semibold text-slate-900">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-emerald-600" />
                  </motion.div>
                </div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={cn("px-8 pb-6 text-slate-600 leading-relaxed", dir === "rtl" && "text-right")}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ t, lang }) {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                {lang === "en" ? CONFIG.brand.nameEn : CONFIG.brand.nameAr}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Professional HVAC services across Kuwait with same-day response and transparent pricing.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>{CONFIG.brand.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp Available</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>{CONFIG.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Service Areas</h3>
            <div className="grid grid-cols-2 gap-2">
              {CONFIG.serviceAreas.map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {lang === "en" ? CONFIG.brand.nameEn : CONFIG.brand.nameAr}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA({ t }) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 md:hidden z-50"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/50">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900">{CONFIG.brand.nameEn}</div>
            <div className="text-sm text-slate-600">{CONFIG.businessHours}</div>
          </div>
          <div className="flex space-x-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${CONFIG.brand.phone}`}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-cyan-600 
                         text-white px-4 py-2 rounded-xl font-medium shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t.ctaCall}</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}`}
              className="flex items-center space-x-2 bg-white border-2 border-emerald-600 
                         text-emerald-600 px-4 py-2 rounded-xl font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WA</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// === FORM COMPONENTS ===

function FormInput({ name, label, type = "text", required = false, placeholder }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-2xl transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
          "placeholder-slate-400",
          focused && "shadow-glow"
        )}
      />
    </div>
  );
}

function FormSelect({ name, label, required = false, options, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                   transition-all duration-200"
      >
        <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
        {options.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ name, label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                   transition-all duration-200 resize-none"
      />
    </div>
  );
}

// === DATA ===

function localBusinessJsonLd(lang) {
  const name = lang === "en" ? CONFIG.brand.nameEn : CONFIG.brand.nameAr;
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name,
    telephone: CONFIG.brand.phone,
    email: CONFIG.brand.email,
    areaServed: CONFIG.serviceAreas.map(area => ({ "@type": "City", name: area })),
    openingHours: "Mo-Th 08:00-20:00,Sa-Su 08:00-20:00",
    url: window.location.origin,
    sameAs: [`https://wa.me/${digitsOnly(CONFIG.brand.whatsapp)}`],
    priceRange: "8-25 KWD",
    serviceType: "HVAC Repair and Maintenance"
  };
}

const translations = {
  en: {
    nav: {
      services: "Services",
      pricing: "Pricing", 
      booking: "Book Now"
    },
    heroBadge: "Licensed • Insured • Fast ETA",
    headline: "AC Repair & Maintenance in Kuwait — Same-Day Service",
    subhead: "Beat the heat with certified technicians. Transparent pricing, clean work, and a real warranty.",
    ctaCall: "Call Now",
    ctaWhatsApp: "WhatsApp Us",
    whatsAppCta: "Hi, I need AC service in Kuwait.",
    whatsAppLead: "New HVAC Lead from website:",
    heroPoints: [
      "30–90 min response",
      "Upfront pricing", 
      "Genuine parts",
      "Dust-free cleanup"
    ],
    services: {
      cooling: "AC Cooling",
      coolingDesc: "Split, central, package units — professional installation & repair services.",
      heating: "Heating Systems",
      heatingDesc: "Heat pumps & climate controls for comfortable mild winters.",
      maintenance: "Maintenance",
      maintenanceDesc: "Seasonal tune-ups, coil cleaning & preventive care.",
      commercial: "Commercial HVAC",
      commercialDesc: "Towers, villas, retail shops & office buildings."
    },
    servicesTitle: "Complete HVAC Solutions",
    servicesSubtitle: "Professional heating, cooling, and maintenance services across Kuwait",
    trust: [
      "MOI & KNPC compliant",
      "Background-checked technicians", 
      "Parts & labor warranty",
      "KNET payment accepted"
    ],
    pricingTitle: "Transparent Pricing",
    pricingCopy: "No hidden fees. Diagnosis includes full inspection and quote before work begins.",
    pricingCta: "Book Service",
    pricingNote: "Final quote depends on unit type, required parts, and accessibility.",
    pricing: [
      { 
        tier: "Diagnosis", 
        price: "8–12 KWD", 
        unit: "/visit", 
        points: ["Complete system inspection", "Detailed issue report", "Credit toward repair cost"]
      },
      { 
        tier: "Tune-Up", 
        price: "15–25 KWD", 
        unit: "/unit", 
        points: ["Filter & coil cleaning", "Refrigerant level check", "30-day service warranty"]
      },
      { 
        tier: "Emergency", 
        price: "+5 KWD", 
        unit: "add-on", 
        points: ["30–90 minute ETA", "After-hours availability", "Priority service routing"]
      }
    ],
    bookTitle: "Book Your Service",
    bookCopy: "Share your details and we'll confirm your appointment via phone or WhatsApp within minutes.",
    form: {
      name: "Full Name",
      namePH: "e.g., Ahmad Al-Rashid",
      phone: "Phone Number",
      email: "Email Address (optional)",
      city: "City / Area",
      cityPH: "Select your area",
      service: "Service Type",
      urgency: "When do you need service?",
      urgencies: { 
        now: "Emergency (now)", 
        today: "Today", 
        thisWeek: "This week" 
      },
      address: "Street Address",
      addressPH: "Street, block, building number...",
      notes: "Additional Notes",
      notesPH: "AC brand, specific issues, access instructions...",
      submit: "Get My Quote",
      sending: "Sending Request...",
      thanks: "Thank you! We'll contact you shortly via WhatsApp."
    },
    privacy: "By submitting, you agree to be contacted by phone/WhatsApp. Reply STOP to opt-out.",
    testiTitle: "What Kuwait Customers Say",
    testiNote: "Real reviews from verified customers",
    testimonials: [
      { 
        name: "Maha A.", 
        area: "Salmiya", 
        quote: "Arrived in 45 minutes and fixed the refrigerant leak. Transparent pricing with no surprises."
      },
      { 
        name: "Yousef K.", 
        area: "Hawally", 
        quote: "Thorough coil cleaning and the airflow is like new. Technician was professional and tidy."
      },
      { 
        name: "Noura S.", 
        area: "Fintas", 
        quote: "AC stopped working at night—emergency team had us sleeping comfortably again within an hour."
      }
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      { 
        q: "How quickly can you arrive?", 
        a: "We typically arrive within 30–90 minutes in Kuwait City and nearby areas. Emergency calls get priority routing." 
      },
      { 
        q: "Do you provide a warranty?", 
        a: "Yes, we offer a standard 90-day warranty on parts and labor unless otherwise specified for your specific repair." 
      },
      { 
        q: "Which AC brands do you service?", 
        a: "We service all major brands including LG, Samsung, Daikin, Gree, Carrier, Mitsubishi, and many others." 
      }
    ],
    errorMsg: "Something went wrong. Please call or WhatsApp us directly."
  },
  ar: {
    nav: {
      services: "خدماتنا",
      pricing: "الأسعار",
      booking: "احجز الآن"
    },
    heroBadge: "مرخّص • مؤمّن • سرعة وصول",
    headline: "تصليح وصيانة التكييف في الكويت — نفس اليوم",
    subhead: "فنيون معتمدون، أسعار واضحة، عمل نظيف، وضمان حقيقي.",
    ctaCall: "اتصل الآن",
    ctaWhatsApp: "واتساب",
    whatsAppCta: "مرحبا، أحتاج خدمة تكييف في الكويت.",
    whatsAppLead: "عميل جديد من الموقع:",
    heroPoints: [
      "وصول 30–90 دقيقة",
      "سعر واضح مسبقًا",
      "قطع أصلية",
      "تنظيف بدون غبار"
    ],
    services: {
      cooling: "أنظمة التبريد",
      coolingDesc: "سبليت ومركزي وباكج — تركيب وإصلاح احترافي.",
      heating: "أنظمة التدفئة", 
      heatingDesc: "مضخات حرارية وأنظمة تحكم للشتاء المعتدل.",
      maintenance: "الصيانة",
      maintenanceDesc: "صيانة موسمية وتنظيف المكثفات والرعاية الوقائية.",
      commercial: "تكييف تجاري",
      commercialDesc: "أبراج وفلل ومحلات تجارية ومباني مكاتب."
    },
    servicesTitle: "حلول تكييف شاملة",
    servicesSubtitle: "خدمات تدفئة وتبريد وصيانة احترافية في جميع أنحاء الكويت",
    trust: [
      "متوافق مع وزارة الداخلية ونفط الكويت",
      "فنيون موثقون ومفحوصون",
      "ضمان قطع وعمالة", 
      "يقبل دفع كي نت"
    ],
    pricingTitle: "أسعار شفافة",
    pricingCopy: "بدون رسوم خفية. التشخيص يشمل فحصاً كاملاً وعرض سعر قبل البدء.",
    pricingCta: "احجز الخدمة",
    pricingNote: "السعر النهائي يعتمد على نوع الوحدة والقطع المطلوبة وسهولة الوصول.",
    pricing: [
      { 
        tier: "تشخيص", 
        price: "8–12 د.ك", 
        unit: "/زيارة", 
        points: ["فحص شامل للنظام", "تقرير مفصل للمشكلة", "يُخصم من تكلفة الإصلاح"]
      },
      { 
        tier: "صيانة", 
        price: "15–25 د.ك", 
        unit: "/وحدة", 
        points: ["تنظيف فلتر ومكثف", "فحص مستوى المبرد", "ضمان خدمة 30 يوماً"]
      },
      { 
        tier: "طارئ", 
        price: "+5 د.ك", 
        unit: "إضافة", 
        points: ["وصول 30–90 دقيقة", "متاح خارج الدوام", "خدمة ذات أولوية"]
      }
    ],
    bookTitle: "احجز خدمتك",
    bookCopy: "شارك تفاصيلك وسنؤكد موعدك عبر الهاتف أو واتساب خلال دقائق.",
    form: {
      name: "الاسم الكامل",
      namePH: "مثال: أحمد الراشد",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني (اختياري)",
      city: "المدينة / المنطقة",
      cityPH: "اختر منطقتك",
      service: "نوع الخدمة",
      urgency: "متى تحتاج الخدمة؟",
      urgencies: { 
        now: "طارئ (الآن)", 
        today: "اليوم", 
        thisWeek: "هذا الأسبوع" 
      },
      address: "عنوان الشارع",
      addressPH: "شارع، قطعة، رقم المبنى...",
      notes: "ملاحظات إضافية",
      notesPH: "ماركة التكييف، مشاكل محددة، تعليمات الوصول...",
      submit: "احصل على عرض السعر",
      sending: "جارٍ إرسال الطلب...",
      thanks: "شكراً لك! سنتواصل معك قريباً عبر واتساب."
    },
    privacy: "بالإرسال توافق على التواصل عبر الهاتف/واتساب. أرسل كلمة إيقاف لإلغاء الاشتراك.",
    testiTitle: "ماذا يقول عملاؤنا في الكويت",
    testiNote: "تقييمات حقيقية من عملاء موثقين",
    testimonials: [
      { 
        name: "مها أ.", 
        area: "السالمية", 
        quote: "وصلوا خلال 45 دقيقة وأصلحوا تسريب المبرد. أسعار شفافة بدون مفاجآت."
      },
      { 
        name: "يوسف ك.", 
        area: "حولي", 
        quote: "تنظيف شامل للمكثفات وتدفق الهواء أصبح كالجديد. الفني محترف ومرتب."
      },
      { 
        name: "نورة س.", 
        area: "الفنطاس", 
        quote: "توقف التكييف ليلاً—فريق الطوارئ جعلنا ننام مرتاحين مرة أخرى خلال ساعة."
      }
    ],
    faqTitle: "الأسئلة الشائعة",
    faq: [
      { 
        q: "كم سرعة وصولكم؟", 
        a: "نصل عادة خلال 30–90 دقيقة في مدينة الكويت والمناطق المجاورة. المكالمات الطارئة لها أولوية في التوجيه." 
      },
      { 
        q: "هل تقدمون ضمان؟", 
        a: "نعم، نقدم ضمان قياسي 90 يوماً على القطع والعمالة إلا إذا حُدد خلاف ذلك لإصلاحك المحدد." 
      },
      { 
        q: "أي ماركات تكييف تخدمون؟", 
        a: "نخدم جميع الماركات الرئيسية بما في ذلك إل جي وسامسونج ودايكن وجري وكاريير وميتسوبيشي وغيرها الكثير." 
      }
    ],
    errorMsg: "حدث خطأ. الرجاء الاتصال أو مراسلتنا على واتساب مباشرة."
  }
};