"use client";

import React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Loader2, MessageCircle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

type FormStatus = "idle" | "loading" | "success" | "error";

export function CTASection() {
  const t = useTranslations("cta");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    businessType: "",
    revenue: "",
    goals: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const businessTypes = [
    { key: "homeServices", label: t("businessTypes.homeServices") },
    { key: "gastronomy", label: t("businessTypes.gastronomy") },
    { key: "realEstate", label: t("businessTypes.realEstate") },
    { key: "events", label: t("businessTypes.events") },
    { key: "beautyWellness", label: t("businessTypes.beautyWellness") },
    { key: "other", label: t("businessTypes.other") },
  ];

  const revenueRanges = [
    { key: "under10k", label: t("revenueRanges.under10k") },
    { key: "10k50k", label: t("revenueRanges.10k50k") },
    { key: "50k200k", label: t("revenueRanges.50k200k") },
    { key: "200kPlus", label: t("revenueRanges.200kPlus") },
    { key: "preferNot", label: t("revenueRanges.preferNot") },
  ];

  const checklist = [
    t("noObligation"),
    t("bilingualConsultation"),
    t("customActionPlan"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        }
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setWhatsappLink(data.whatsappLink || "");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient + glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FF4500]/[0.04] blur-[180px] pointer-events-none" />

      {/* Floating shutter decorations in corners */}
      <div className="absolute top-16 right-16 opacity-[0.03] pointer-events-none hidden lg:block">
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="22" stroke="#FF4500" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={24 + 10 * Math.cos(rad)}
                y1={24 + 10 * Math.sin(rad)}
                x2={24 + 21 * Math.cos(rad)}
                y2={24 + 21 * Math.sin(rad)}
                stroke="#FF4500"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
      <div className="absolute bottom-20 left-12 opacity-[0.02] pointer-events-none hidden lg:block">
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={24 + 8 * Math.cos(rad)}
                y1={24 + 8 * Math.sin(rad)}
                x2={24 + 22 * Math.cos(rad)}
                y2={24 + 22 * Math.sin(rad)}
                stroke="white"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.9] text-foreground">
              {t("title1")}
              <br />
              {t("title2")}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF4500 0%, #FF8C00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("title3")}
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-8">
              <div className="flex items-center gap-3 text-muted-foreground/50">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs font-medium tracking-wider uppercase">
                  {t("googlePartner")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground/50">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0022 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
                <span className="text-xs font-medium tracking-wider uppercase">
                  {t("metaPartner")}
                </span>
              </div>
            </div>

            {/* Checklist */}
            <ul className="mt-10 flex flex-col gap-4">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF4500]/15">
                    <Check className="h-3.5 w-3.5 text-[#FF4500]" />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Form card with animated border */}
            <div className="relative rounded-2xl">
              {/* Animated border glow */}
              <div className="absolute -inset-px rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(255,69,0,0.4), transparent, transparent)",
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Inner card */}
              <div className="relative rounded-2xl bg-[#111111] p-8 lg:p-10">
                {status === "success" ? (
                  /* ===== SUCCESS STATE ===== */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4500]/15 mb-6">
                      <CheckCircle2 className="h-8 w-8 text-[#FF4500]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {t("successTitle")}
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                      {t("successMessage")}
                    </p>
                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
                      >
                        <MessageCircle className="h-5 w-5" />
                        {t("chatWhatsapp")}
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setFormState({ name: "", email: "", businessType: "", revenue: "", goals: "" });
                      }}
                      className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t("submitAnother")}
                    </button>
                  </motion.div>
                ) : (
                  /* ===== FORM STATE ===== */
                  <>
                    <h3 className="font-display text-2xl font-bold tracking-wide text-foreground mb-2">
                      {t("formTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8">
                      {t("formDescription")}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="cta-name"
                          className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
                        >
                          {t("labelName")}
                        </label>
                        <input
                          id="cta-name"
                          type="text"
                          inputMode="text"
                          autoComplete="name"
                          placeholder={t("placeholderName")}
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full rounded-lg border border-foreground/10 bg-[#0a0a0a] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_20px_rgba(255,69,0,0.1)] disabled:opacity-50"
                        />
                        {fieldErrors.name && (
                          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name[0]}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="cta-email"
                          className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
                        >
                          {t("labelEmail")}
                        </label>
                        <input
                          id="cta-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder={t("placeholderEmail")}
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full rounded-lg border border-foreground/10 bg-[#0a0a0a] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_20px_rgba(255,69,0,0.1)] disabled:opacity-50"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email[0]}</p>
                        )}
                      </div>

                      {/* Business Type */}
                      <div>
                        <label
                          htmlFor="cta-business"
                          className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
                        >
                          {t("labelBusiness")}
                        </label>
                        <select
                          id="cta-business"
                          value={formState.businessType}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              businessType: e.target.value,
                            })
                          }
                          disabled={status === "loading"}
                          className="w-full rounded-lg border border-foreground/10 bg-[#0a0a0a] px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_20px_rgba(255,69,0,0.1)] appearance-none cursor-pointer disabled:opacity-50"
                        >
                          <option value="" disabled className="text-muted-foreground">
                            {t("placeholderBusiness")}
                          </option>
                          {businessTypes.map((type) => (
                            <option key={type.key} value={type.label} className="bg-[#0a0a0a]">
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.businessType && (
                          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.businessType[0]}</p>
                        )}
                      </div>

                      {/* Monthly Revenue */}
                      <div>
                        <label
                          htmlFor="cta-revenue"
                          className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
                        >
                          {t("labelRevenue")}
                        </label>
                        <select
                          id="cta-revenue"
                          value={formState.revenue}
                          onChange={(e) =>
                            setFormState({ ...formState, revenue: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full rounded-lg border border-foreground/10 bg-[#0a0a0a] px-4 py-3.5 text-sm text-foreground transition-all duration-300 focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_20px_rgba(255,69,0,0.1)] appearance-none cursor-pointer disabled:opacity-50"
                        >
                          <option value="" disabled className="text-muted-foreground">
                            {t("placeholderRevenue")}
                          </option>
                          {revenueRanges.map((range) => (
                            <option
                              key={range.key}
                              value={range.label}
                              className="bg-[#0a0a0a]"
                            >
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Goals textarea */}
                      <div>
                        <label
                          htmlFor="cta-goals"
                          className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2"
                        >
                          {t("labelGoals")}
                        </label>
                        <textarea
                          id="cta-goals"
                          rows={4}
                          placeholder={t("placeholderGoals")}
                          value={formState.goals}
                          onChange={(e) =>
                            setFormState({ ...formState, goals: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full rounded-lg border border-foreground/10 bg-[#0a0a0a] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_20px_rgba(255,69,0,0.1)] resize-none disabled:opacity-50"
                        />
                      </div>

                      {/* Error message */}
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 text-center"
                        >
                          {errorMessage}
                        </motion.p>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        className="group mt-2 w-full flex items-center justify-center gap-3 rounded-full bg-[#FF4500] px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,69,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                        whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t("sending")}
                          </>
                        ) : (
                          <>
                            {t("submitButton")}
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>

                      {/* WhatsApp alternative */}
                      <p className="text-center text-xs text-muted-foreground/60 mt-1">
                        {t("preferWhatsapp")}{" "}
                        <a
                          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "13055550123"}?text=${encodeURIComponent(t("whatsappMessage"))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline"
                        >
                          {t("messageDirectly")}
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
