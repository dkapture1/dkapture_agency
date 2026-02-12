import { NextRequest, NextResponse } from "next/server";
import { getResend, EMAIL_CONFIG, getWhatsAppLink } from "@/lib/resend";
import { contactFormSchema } from "@/lib/validations";

// Simple in-memory rate limiting (per deployment instance)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, businessType, revenue, goals } = result.data;

    // 1. Send notification email to Dkapture team
    await getResend().emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.contactRecipient,
      replyTo: email,
      subject: `New Lead: ${name} — ${businessType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #FF4500; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #FF4500; margin: 0; font-size: 24px;">New Strategy Call Request</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; width: 140px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FF4500;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Business Type</td><td style="padding: 8px 0; color: #fff;">${businessType}</td></tr>
            ${revenue ? `<tr><td style="padding: 8px 0; color: #999;">Revenue Range</td><td style="padding: 8px 0; color: #fff;">${revenue}</td></tr>` : ""}
            ${goals ? `<tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Goals</td><td style="padding: 8px 0; color: #fff;">${goals}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #333;">
            <a href="mailto:${email}" style="display: inline-block; background: #FF4500; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    // 2. Send confirmation email to the lead
    await getResend().emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: "We received your request — Dkapture",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #FF4500; margin: 0; font-size: 28px;">DKAPTURE</h1>
          </div>
          <h2 style="color: #fff; margin-bottom: 16px;">Thank you, ${name}!</h2>
          <p style="color: #ccc; line-height: 1.6;">We received your strategy call request and our team will get back to you within 24 hours.</p>
          <p style="color: #ccc; line-height: 1.6;">In the meantime, you can reach us directly on WhatsApp for a faster response:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${getWhatsAppLink(name, businessType)}" style="display: inline-block; background: #25D366; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Chat on WhatsApp</a>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 32px; text-align: center;">Dkapture | AI-Powered Digital Marketing Agency<br>Miami, FL | Orlando, FL</p>
        </div>
      `,
    });

    // 3. Return success with WhatsApp link
    return NextResponse.json({
      success: true,
      message: "Your request has been received. We'll be in touch within 24 hours!",
      whatsappLink: getWhatsAppLink(name, businessType),
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
