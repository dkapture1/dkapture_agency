"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Camera Shutter / Lens SVG  – large decorative background element  */
/* ------------------------------------------------------------------ */
function ShutterDecoration() {
  const bladeCount = 12;
  const innerRadius = 120;
  const outerRadius = 340;

  return (
    <svg
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle
        cx="350"
        cy="350"
        r="340"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.15"
      />
      {/* Middle ring */}
      <circle
        cx="350"
        cy="350"
        r="240"
        stroke="white"
        strokeWidth="0.3"
        opacity="0.08"
      />
      {/* Inner ring */}
      <circle
        cx="350"
        cy="350"
        r="120"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.2"
      />
      {/* Core dot */}
      <circle cx="350" cy="350" r="4" fill="white" opacity="0.25" />

      {/* Radial blades */}
      {Array.from({ length: bladeCount }).map((_, i) => {
        const angle = (i * 360) / bladeCount;
        const rad = (angle * Math.PI) / 180;
        const x1 = 350 + innerRadius * Math.cos(rad);
        const y1 = 350 + innerRadius * Math.sin(rad);
        const x2 = 350 + outerRadius * Math.cos(rad);
        const y2 = 350 + outerRadius * Math.sin(rad);
        return (
          <line
            key={`blade-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth="0.5"
            opacity="0.12"
          />
        );
      })}

      {/* Tick marks on outer ring */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i * 360) / 60;
        const rad = (angle * Math.PI) / 180;
        const isMajor = i % 5 === 0;
        const r1 = isMajor ? 320 : 330;
        const r2 = 340;
        const x1 = 350 + r1 * Math.cos(rad);
        const y1 = 350 + r1 * Math.sin(rad);
        const x2 = 350 + r2 * Math.cos(rad);
        const y2 = 350 + r2 * Math.sin(rad);
        return (
          <line
            key={`tick-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth={isMajor ? "0.6" : "0.3"}
            opacity={isMajor ? "0.18" : "0.08"}
          />
        );
      })}

      {/* Arc segments for shutter-blade feel */}
      {Array.from({ length: 6 }).map((_, i) => {
        const startAngle = i * 60 + 5;
        const endAngle = i * 60 + 55;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const r = 200;
        const x1 = 350 + r * Math.cos(startRad);
        const y1 = 350 + r * Math.sin(startRad);
        const x2 = 350 + r * Math.cos(endRad);
        const y2 = 350 + r * Math.sin(endRad);
        return (
          <path
            key={`arc-${i}`}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            stroke="white"
            strokeWidth="0.4"
            fill="none"
            opacity="0.06"
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating geometric element for parallax                           */
/* ------------------------------------------------------------------ */
function FloatingElement({
  x,
  y,
  size,
  type,
  scrollProgress,
  speed,
}: {
  x: string;
  y: string;
  size: number;
  type: "circle" | "line" | "ring";
  scrollProgress: ReturnType<typeof useTransform>;
  speed: number;
}) {
  const yOffset = useTransform(scrollProgress, [0, 1], [0, speed]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        y: yOffset,
      }}
    >
      {type === "circle" && (
        <div
          className="rounded-full border border-foreground/[0.08]"
          style={{ width: size, height: size }}
        />
      )}
      {type === "ring" && (
        <div
          className="rounded-full border border-foreground/[0.05]"
          style={{ width: size, height: size }}
        />
      )}
      {type === "line" && (
        <div
          className="bg-foreground/[0.06]"
          style={{ width: 1, height: size }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat item with count-up animation                                 */
/* ------------------------------------------------------------------ */
function StatItem({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8 + index * 0.15, ease: "easeOut" }}
    >
      <span className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
        {value}
      </span>
      <span className="text-xs tracking-widest uppercase text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero                                                         */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const shutterRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const shutterScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const shutterOpacity = useTransform(scrollYProgress, [0, 0.6], [0.06, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.4]);

  /* Track scroll for floating elements */
  const floatProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "$12M+", label: "Ad Spend Managed" },
    { value: "3", label: "Countries" },
  ];

  /* Staggered animation variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
      id="hero"
    >
      {/* ============ BACKGROUND LAYERS ============ */}

      {/* Animated radial glow - breathing pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ scale: glowScale }}
      >
        <div className="relative">
          {/* Primary glow */}
          <motion.div
            className="h-[700px] w-[700px] rounded-full lg:h-[900px] lg:w-[900px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,69,0,0.12) 0%, rgba(255,69,0,0.04) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Secondary warm halo */}
          <motion.div
            className="absolute inset-0 h-[700px] w-[700px] rounded-full lg:h-[900px] lg:w-[900px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </motion.div>

      {/* Camera Shutter decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none lg:h-[700px] lg:w-[700px]"
        style={{
          rotate: shutterRotate,
          scale: shutterScale,
          opacity: shutterOpacity,
        }}
      >
        <ShutterDecoration />
      </motion.div>

      {/* Floating geometric elements */}
      <FloatingElement
        x="8%"
        y="18%"
        size={100}
        type="circle"
        scrollProgress={floatProgress}
        speed={-120}
      />
      <FloatingElement
        x="85%"
        y="25%"
        size={60}
        type="ring"
        scrollProgress={floatProgress}
        speed={-80}
      />
      <FloatingElement
        x="15%"
        y="70%"
        size={150}
        type="line"
        scrollProgress={floatProgress}
        speed={100}
      />
      <FloatingElement
        x="78%"
        y="65%"
        size={80}
        type="circle"
        scrollProgress={floatProgress}
        speed={-60}
      />
      <FloatingElement
        x="92%"
        y="50%"
        size={200}
        type="line"
        scrollProgress={floatProgress}
        speed={140}
      />
      <FloatingElement
        x="3%"
        y="45%"
        size={40}
        type="ring"
        scrollProgress={floatProgress}
        speed={-100}
      />
      <FloatingElement
        x="50%"
        y="12%"
        size={70}
        type="circle"
        scrollProgress={floatProgress}
        speed={-50}
      />
      <FloatingElement
        x="35%"
        y="80%"
        size={120}
        type="line"
        scrollProgress={floatProgress}
        speed={80}
      />

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`scanline-${i}`}
            className="absolute left-0 right-0 h-px bg-foreground/[0.015]"
            style={{ top: `${12 + i * 11}%` }}
          />
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ============ MAIN CONTENT ============ */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Pre-headline badge */}
          <motion.div variants={fadeUpVariants}>
            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4500] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4500]" />
              </span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                AI-Powered Digital Agency
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div style={{ y: headlineY }}>
            <motion.h1 className="font-display font-bold leading-[0.88] tracking-tight">
              <motion.span
                variants={lineVariants}
                className="block text-4xl text-foreground sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]"
              >
                {"We Don't Just Capture"}
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block text-4xl text-foreground sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]"
              >
                Your Image
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="mt-2 block text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF4500 0%, #FF6A00 50%, #FF8C00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                We Build Your
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF4500 0%, #FF6A00 50%, #FF8C00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Digital Empire
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div style={{ y: subY }}>
            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-10 lg:text-xl"
            >
              AI-powered marketing ecosystem for Brazilian entrepreneurs
              conquering the American market
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 lg:mt-14"
          >
            {/* Primary CTA */}
            <motion.a
              href="#start"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#FF4500] px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 sm:px-10 sm:py-4.5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHoveredPrimary(true)}
              onMouseLeave={() => setIsHoveredPrimary(false)}
              style={{
                boxShadow: isHoveredPrimary
                  ? "0 0 50px rgba(255,69,0,0.5), 0 0 100px rgba(255,69,0,0.2)"
                  : "0 0 20px rgba(255,69,0,0.15)",
              }}
            >
              {/* Sheen effect on hover */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={isHoveredPrimary ? { translateX: "100%" } : { translateX: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10">Start Your Transformation</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#reel"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-transparent px-8 py-4 text-base font-medium text-foreground transition-all duration-300 hover:border-foreground/25 hover:bg-foreground/[0.07] sm:px-10 sm:py-4.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:border-foreground/40 group-hover:bg-foreground/10">
                <Play className="h-3 w-3 fill-foreground text-foreground ml-0.5" />
              </span>
              Watch Our Reel
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ STATS BAR ============ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-foreground/[0.06]"
        style={{ y: statsY }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-7 sm:flex-row sm:gap-0 lg:px-8 lg:py-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <StatItem value={stat.value} label={stat.label} index={i} />
              {i < stats.length - 1 && (
                <motion.div
                  className="hidden h-8 w-px bg-foreground/[0.08] sm:block sm:ml-6"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 + i * 0.1 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF4500]/20 to-transparent" />
      </motion.div>

      {/* Top letterbox bar - cinematic */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF4500]/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />
    </section>
  );
}
