import { NextRequest, NextResponse } from "next/server";
import { getResend, EMAIL_CONFIG } from "@/lib/resend";
import { newsletterSchema } from "@/lib/validations";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
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
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Send welcome email
    await getResend().emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: "Welcome to Dkapture Insights",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #FF4500; margin: 0; font-size: 28px;">DKAPTURE</h1>
          </div>
          <h2 style="color: #fff; margin-bottom: 16px;">You're in!</h2>
          <p style="color: #ccc; line-height: 1.6;">Welcome to Dkapture Insights. You'll receive our best content on AI-powered marketing, growth strategies, and tips for Brazilian entrepreneurs in the USA.</p>
          <p style="color: #ccc; line-height: 1.6;">Expect actionable insights, not spam. We send 1-2 emails per month.</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="https://dkapture.com" style="display: inline-block; background: #FF4500; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Explore Our Ecosystem</a>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 32px; text-align: center;">Dkapture | AI-Powered Digital Marketing Agency<br>Miami, FL | Orlando, FL</p>
        </div>
      `,
    });

    // Notify team about new subscriber
    await getResend().emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.contactRecipient,
      subject: `New Newsletter Subscriber: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #111; color: #fff; border-radius: 8px;">
          <h2 style="color: #FF4500;">New Subscriber</h2>
          <p style="color: #ccc;">Email: <strong>${email}</strong></p>
          <p style="color: #999; font-size: 12px;">Subscribed at: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Welcome! Check your inbox for a confirmation.",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
