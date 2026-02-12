import { Resend } from "resend";

// Lazy initialization — only throws at runtime, not during build
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// Dkapture email configuration
export const EMAIL_CONFIG = {
  from: "Dkapture <hello@dkapture.com>",
  replyTo: "hello@dkapture.com",
  contactRecipient: process.env.CONTACT_EMAIL || "hello@dkapture.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "13055550123",
};

/**
 * Generate a pre-formatted WhatsApp link
 */
export function getWhatsAppLink(name: string, businessType: string): string {
  const message = encodeURIComponent(
    `Hi! I'm ${name} and I run a ${businessType} business. I just filled out the form on dkapture.com and would like to discuss my project.`
  );
  return `https://wa.me/${EMAIL_CONFIG.whatsappNumber}?text=${message}`;
}
