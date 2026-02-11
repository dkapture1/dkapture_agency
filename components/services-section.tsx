"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Camera,
  Globe,
  Film,
  TrendingUp,
  Brain,
  ArrowRight,
} from "lucide-react";
import { ShutterIcon } from "./shutter-icon";

const services = [
  {
    icon: Camera,
    title: "Brand Identity & Image",
    description:
      "We craft the visual DNA that makes your brand unmistakable in the American market.",
    bullets: [
      "Logo & Visual Identity Systems",
      "Professional Photography",
      "Image Consulting & Personal Branding",
      "Brand Strategy & Positioning",
    ],
    span: "col",
  },
  {
    icon: Globe,
    title: "Digital Platforms",
    description:
      "High-converting digital experiences built for performance and scale.",
    bullets: [
      "Custom Web Design & Development",
      "E-commerce & Shopify Solutions",
      "SEO & Technical Optimization",
      "Landing Pages & Funnels",
    ],
    span: "col",
  },
  {
    icon: Film,
    title: "Visual Storytelling",
    description:
      "Cinematic content that captures attention and drives engagement.",
    bullets: [
      "Video Production & Editing",
      "Aerial Drone Cinematography",
      "Motion Graphics & Animation",
      "Social Media Content Packages",
    ],
    span: "col",
  },
  {
    icon: TrendingUp,
    title: "Growth & Performance",
    description:
      "Data-driven campaigns that turn ad spend into predictable revenue.",
    bullets: [
      "Google Ads Management",
      "Meta & TikTok Ads",
      "CRM Automation & Email Flows",
      "Conversion Rate Optimization",
    ],
    span: "col",
  },
  {
    icon: Brain,
    title: "AI Intelligence Lab",
    description:
      "Proprietary AI tools built specifically for bilingual businesses. This is where technology meets cultural intelligence.",
    bullets: [
      "Bilingual AI Chatbots (EN/PT)",
      "Predictive Analytics & Market Trends",
      "AI-Powered Content Generation",
      "Automated Audience Segmentation",
    ],
    span: "featured",
  },
];

/* Dashed connection lines between cards */
function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {/* Horizontal dashes */}
      <line
        x1="33.33%"
        y1="25%"
        x2="33.33%"
        y2="75%"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.04"
      />
      <line
        x1="66.66%"
        y1="10%"
        x2="66.66%"
        y2="60%"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.04"
      />
      <line
        x1="10%"
        y1="55%"
        x2="90%"
        y2="55%"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.04"
      />
    </svg>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" className="opacity-100">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.03"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Section glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF4500]/[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-6 mb-8">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground">
              The Ecosystem
            </h2>
            <span className="hidden sm:block h-px flex-1 bg-[#FF4500]" />
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Five interconnected pillars powering your digital transformation.
            Each one designed to amplify the others.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ConnectionLines />

          {services.map((service) => {
            const isFeatured = service.span === "featured";

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative rounded-2xl border bg-[#111111] p-8 lg:p-10 transition-all duration-500 ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-3 border-[#FF4500]/20"
                    : "border-foreground/5 hover:border-foreground/10"
                }`}
                style={
                  isFeatured
                    ? {}
                    : undefined
                }
              >
                {/* Featured card animated border glow */}
                {isFeatured && (
                  <div className="absolute -inset-px rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,69,0,0.3), transparent)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["200% 0%", "-200% 0%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}

                {/* Inner content wrapper for featured to sit above the glow */}
                <div
                  className={`relative z-10 ${
                    isFeatured ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" : ""
                  }`}
                >
                  <div>
                    {/* Icon */}
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ${
                          isFeatured
                            ? "bg-[#FF4500]/20 text-[#FF4500]"
                            : "bg-foreground/5 text-foreground group-hover:bg-[#FF4500]/10 group-hover:text-[#FF4500]"
                        }`}
                      >
                        {isFeatured ? (
                          <ShutterIcon className="h-6 w-6 animate-shutter-spin" />
                        ) : (
                          <service.icon className="h-6 w-6" />
                        )}
                      </div>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF4500]/30 bg-[#FF4500]/10 px-3 py-1 text-xs font-medium text-[#FF4500]">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4500] opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF4500]" />
                          </span>
                          Powered by AI
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-display font-bold tracking-wide text-foreground mb-3 ${
                        isFeatured ? "text-3xl lg:text-4xl" : "text-xl"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Bullet points */}
                    <ul className="flex flex-col gap-3 mb-8">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4500]/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More link */}
                    <a
                      href="#"
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#FF4500] transition-all duration-300 hover:gap-3"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Hover bottom glow for non-featured cards */}
                {!isFeatured && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-[#FF4500]/0 transition-all duration-500 group-hover:bg-[#FF4500]/40 group-hover:shadow-[0_0_20px_rgba(255,69,0,0.15)]" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
