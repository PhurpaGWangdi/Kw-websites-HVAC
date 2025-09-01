export interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  urgency: string;
  address?: string;
  notes?: string;
}

export interface WebhookPayload extends FormData {
  lang: 'en' | 'ar';
  source: string;
  timestamp: string;
  page: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  idempotencyKey?: string;
}

export type Language = 'en' | 'ar';