"use client";

import { useState } from "react";
import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface CaseGalleryProps {
    study: CaseStudy;
}

export function CaseGallery({ study }: CaseGalleryProps) {
    const t = useTranslations();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!study.gallery || study.gallery.length === 0) return null;

    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4">
                {/* Gallery Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {study.gallery.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative cursor-pointer overflow-hidden rounded-xl ${
                                // Make the first item span 2 columns/rows for visual interest if more than 3 items
                                index === 0 && study.gallery.length > 3
                                    ? "sm:col-span-2 sm:row-span-2"
                                    : "aspect-square"
                                }`}
                            onClick={() => setSelectedImage(item.src)}
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={item.src}
                                    alt={t(item.altKey)}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                    <ZoomIn className="text-white" size={32} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative h-full max-h-[85vh] w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Gallery Preview"
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
