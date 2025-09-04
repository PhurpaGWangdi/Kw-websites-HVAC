// Brand configuration and constants
export const AVATARS = {
  maha: "/avatars/maha.jpg",
  yousef: "/avatars/yousef.jpg",
  noura: "/avatars/noura.jpg",
  ahmad: "/avatars/ahmad.jpg",
};

export const CONFIG = {
  brand: {
    nameEn: "KwCool HVAC",
    nameAr: "كيو كول للتكييف",
    phone: "+965 5000 0000",
    whatsapp: "+96550000000",
    email: "book@kwcool.example"
  },
  serviceAreas: [
    "Kuwait City",
    "Salmiya", 
    "Hawally",
    "Farwaniya",
    "Jahra",
    "Fintas",
    "Fahaheel",
    "Mangaf"
  ],
  businessHours: "Sat–Thu 8:00–20:00",

  // Optional: paste your Spline scene URL to enable 3D hero
  // Example template scene (replace with your own for production):
  splineScene: "",
  webhookUrl: "https://hooks.make.com/REPLACE_ME"
};

export const COPY = {
  en: {
    // Navigation
    navServices: "Services",
    navPricing: "Pricing", 
    navContact: "Contact",
    langSwitch: "العربية",
    
    // Hero
    heroTitle: "AC Repair & Maintenance in Kuwait — Same-Day Service",
    heroSubtitle: "Beat the heat with certified technicians. Transparent pricing, clean work, and a real warranty.",
    heroBadges: "Licensed • Insured • Fast ETA",
    heroPoints: [
      "30–90 min response",
      "Upfront pricing", 
      "Genuine parts",
      "Dust-free cleanup"
    ],
    callNow: "Call Now",
    whatsappNow: "WhatsApp",
    
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Complete HVAC solutions for homes and businesses",
    serviceCooling: "Cooling Systems",
    serviceCoolingDesc: "Split, Central & Package units - installation and repair",
    serviceHeating: "Heating Systems", 
    serviceHeatingDesc: "Heat pumps & climate controls",
    serviceMaintenance: "Maintenance",
    serviceMaintenanceDesc: "Seasonal tune-ups & coil cleaning",
    serviceCommercial: "Commercial HVAC",
    serviceCommercialDesc: "Towers, villas, shops & offices",
    
    // Trust
    trustTitle: "Why Choose KwCool?",
    trustItems: [
      "MOI & KNPC compliant",
      "Background-checked technicians", 
      "Parts & labor warranty",
      "KNET payment accepted"
    ],
    
    // Pricing
    pricingTitle: "Transparent Pricing",
    pricingSubtitle: "No hidden fees, no surprises",
    pricingDiagnosis: "Diagnosis",
    pricingDiagnosisPrice: "8–12 KWD",
    pricingDiagnosisDesc: "Full inspection, issue report, applies to repair cost",
    pricingTuneup: "Tune-Up",
    pricingTuneupPrice: "15–25 KWD",
    pricingTuneupDesc: "Filter & coil clean, gas check, 30-day warranty",
    pricingEmergency: "Emergency Add-On",
    pricingEmergencyPrice: "+5 KWD",
    pricingEmergencyDesc: "30–90 min ETA, after-hours, priority routing",
    pricingNote: "Final price depends on unit type, parts, and access",
    
    // Areas
    areasTitle: "Areas We Serve",
    areasSubtitle: "Fast response across Kuwait",
    
    // Booking
    bookingTitle: "Book Your Service",
    bookingSubtitle: "Get a technician to your location",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address", 
    formCity: "City/Area",
    formService: "Service Needed",
    formUrgency: "When do you need service?",
    formAddress: "Address (optional)",
    formNotes: "Additional Details",
    formSubmit: "Book Service",
    formSuccess: "Thank you! We'll contact you shortly via WhatsApp.",
    formError: "Something went wrong. Please try calling us directly.",
    formPrivacy: "By submitting, you agree to be contacted by phone/WhatsApp. Reply STOP to opt-out.",
    urgencyNow: "Emergency (now)",
    urgencyToday: "Today",
    urgencyWeek: "This week",
    
    // Testimonials
    testimonialsTitle: "What Our Customers Say",
    testimonials: [
      { name: "Yousef K.", area: "Hawally", quote: "Coils cleaned and the airflow is like new. Technician was polite and tidy.", avatar: AVATARS.yousef },
      { name: "Noura S.", area: "Fintas", quote: "AC stopped at night—emergency team got us sleeping cool again.", avatar: AVATARS.noura },
      { name: "Maha A.", area: "Salmiya", quote: "Arrived in 45 minutes and fixed the leak. Transparent price, no surprises.", avatar: AVATARS.maha },
      { name: "Ahmad R.", area: "Farwaniya", quote: "Professional crew. Explained the issue and gave a fair quote.", avatar: AVATARS.ahmad },
    ],
    
    // FAQ
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How fast can you arrive?",
    faq1A: "Usually within 30–90 minutes in Kuwait City & nearby areas.",
    faq2Q: "Do you provide a warranty?",
    faq2A: "Standard 90-day warranty on parts and labor unless specified.",
    faq3Q: "Which brands do you service?",
    faq3A: "All major brands: LG, Samsung, Daikin, Gree, Carrier, Mitsubishi.",
    
    // Footer
    footerHours: "Business Hours",
    footerContact: "Contact Info",
    footerAreas: "Service Areas",
    footerRights: "All rights reserved."
  },
  
  ar: {
    // Navigation
    navServices: "خدماتنا",
    navPricing: "الأسعار",
    navContact: "اتصل بنا", 
    langSwitch: "English",
    
    // Hero
    heroTitle: "تصليح وصيانة التكييف في الكويت — نفس اليوم",
    heroSubtitle: "فنيون معتمدون، أسعار واضحة، وضمان حقيقي.",
    heroBadges: "مرخّص • مؤمّن • سرعة وصول",
    heroPoints: [
      "وصول 30–90 دقيقة",
      "سعر واضح مسبقًا",
      "قطع أصلية", 
      "تنظيف بدون غبار"
    ],
    callNow: "اتصل الآن",
    whatsappNow: "واتساب",
    
    // Services
    servicesTitle: "خدماتنا",
    servicesSubtitle: "حلول تكييف شاملة للمنازل والشركات",
    serviceCooling: "أنظمة التبريد",
    serviceCoolingDesc: "سبليت، مركزي، وحدة - تركيب وإصلاح",
    serviceHeating: "أنظمة التدفئة",
    serviceHeatingDesc: "مضخات حرارية وأنظمة تحكم",
    serviceMaintenance: "الصيانة",
    serviceMaintenanceDesc: "صيانة موسمية وتنظيف المكثفات",
    serviceCommercial: "تكييف تجاري",
    serviceCommercialDesc: "أبراج، فلل، محلات ومكاتب",
    
    // Trust
    trustTitle: "لماذا تختار كيو كول؟",
    trustItems: [
      "متوافق مع وزارة الداخلية ونفط الكويت",
      "فنيون موثقون",
      "ضمان قطع وعمالة", 
      "يقبل دفع كي نت"
    ],
    
    // Pricing
    pricingTitle: "أسعار شفافة",
    pricingSubtitle: "بدون رسوم خفية، بدون مفاجآت",
    pricingDiagnosis: "تشخيص",
    pricingDiagnosisPrice: "8–12 د.ك",
    pricingDiagnosisDesc: "فحص كامل، تقرير المشكلة، يخصم من تكلفة الإصلاح",
    pricingTuneup: "صيانة",
    pricingTuneupPrice: "15–25 د.ك",
    pricingTuneupDesc: "تنظيف فلتر ومكثف، فحص غاز، ضمان 30 يوم",
    pricingEmergency: "إضافة طوارئ",
    pricingEmergencyPrice: "+5 د.ك",
    pricingEmergencyDesc: "وصول 30–90 دقيقة، خارج الدوام، أولوية",
    pricingNote: "السعر النهائي يعتمد على نوع الوحدة والقطع وسهولة الوصول",
    
    // Areas
    areasTitle: "المناطق التي نخدمها",
    areasSubtitle: "استجابة سريعة في جميع أنحاء الكويت",
    
    // Booking
    bookingTitle: "احجز خدمتك",
    bookingSubtitle: "احصل على فني في موقعك",
    formName: "الاسم الكامل",
    formPhone: "رقم الهاتف",
    formEmail: "البريد الإلكتروني",
    formCity: "المدينة/المنطقة", 
    formService: "الخدمة المطلوبة",
    formUrgency: "متى تحتاج الخدمة؟",
    formAddress: "العنوان (اختياري)",
    formNotes: "تفاصيل إضافية",
    formSubmit: "احجز الخدمة",
    formSuccess: "شكرًا لك! سنتواصل معك قريبًا عبر واتساب.",
    formError: "حدث خطأ. يرجى الاتصال بنا مباشرة.",
    formPrivacy: "بالإرسال توافق على التواصل عبر الهاتف/واتساب. أرسل كلمة إيقاف لإلغاء الاشتراك.",
    urgencyNow: "طارئ (الآن)",
    urgencyToday: "اليوم", 
    urgencyWeek: "هذا الأسبوع",
    
    // Testimonials
    testimonialsTitle: "ماذا يقول عملاؤنا",
    testimonials: [
      { name: "يوسف ك.", area: "حولي", quote: "نظف المكثفات وتدفق الهواء أصبح كالجديد. الفني مهذب ومرتب.", avatar: AVATARS.yousef },
      { name: "نورا س.", area: "الفنطاس", quote: "التكييف توقف ليلاً—فريق الطوارئ جعلنا ننام بارداً مرة أخرى.", avatar: AVATARS.noura },
      { name: "مها أ.", area: "السالمية", quote: "وصل في 45 دقيقة وأصلح التسريب. سعر واضح، بدون مفاجآت.", avatar: AVATARS.maha },
      { name: "أحمد ر.", area: "الفروانية", quote: "طاقم محترف. شرح المشكلة وأعطى سعر عادل.", avatar: AVATARS.ahmad },
    ],
    
    // FAQ
    faqTitle: "الأسئلة الشائعة",
    faq1Q: "كم سرعة وصولكم؟",
    faq1A: "عادة خلال 30–90 دقيقة في مدينة الكويت والمناطق المجاورة.",
    faq2Q: "هل تقدمون ضمان؟",
    faq2A: "ضمان قياسي 90 يوم على القطع والعمالة إلا إذا حُدد غير ذلك.",
    faq3Q: "أي ماركات تخدمون؟",
    faq3A: "جميع الماركات الرئيسية: إل جي، سامسونج، دايكن، جري، كاريير، ميتسوبيشي.",
    
    // Footer
    footerHours: "ساعات العمل",
    footerContact: "معلومات الاتصال",
    footerAreas: "مناطق الخدمة", 
    footerRights: "جميع الحقوق محفوظة."
  }
};