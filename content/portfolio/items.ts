import { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
    {
        slug: "urban-oasis",
        titleKey: "caseStudies.urbanOasis.title",
        clientKey: "caseStudies.urbanOasis.client",
        industry: "real-estate",
        durationKey: "caseStudies.urbanOasis.duration",
        servicesUsed: ["digital-platforms", "brand-identity", "visual-storytelling"],
        heroImage: "/images/portfolio/urban-oasis-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.urbanOasis.challenge.description",
            clientQuoteKey: "caseStudies.urbanOasis.challenge.quote",
            clientName: "Elena Rodriguez",
            clientTitleKey: "caseStudies.urbanOasis.challenge.clientTitle",
            painPointsKeys: [
                "caseStudies.urbanOasis.challenge.painPoints.0",
                "caseStudies.urbanOasis.challenge.painPoints.1",
                "caseStudies.urbanOasis.challenge.painPoints.2"
            ]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.urbanOasis.approach.step1.title",
                    descriptionKey: "caseStudies.urbanOasis.approach.step1.description",
                    icon: "Search"
                },
                {
                    titleKey: "caseStudies.urbanOasis.approach.step2.title",
                    descriptionKey: "caseStudies.urbanOasis.approach.step2.description",
                    icon: "PenTool"
                },
                {
                    titleKey: "caseStudies.urbanOasis.approach.step3.title",
                    descriptionKey: "caseStudies.urbanOasis.approach.step3.description",
                    icon: "Monitor"
                }
            ]
        },
        gallery: [
            {
                src: "/images/portfolio/urban-oasis-1.jpg",
                altKey: "caseStudies.urbanOasis.gallery.1",
                type: "image"
            },
            {
                src: "/images/portfolio/urban-oasis-2.jpg",
                altKey: "caseStudies.urbanOasis.gallery.2",
                type: "image"
            }
        ],
        results: {
            metrics: [
                {
                    labelKey: "caseStudies.metrics.leads",
                    before: "15/mo",
                    after: "140/mo"
                },
                {
                    labelKey: "caseStudies.metrics.conversion",
                    before: "1.2%",
                    after: "4.8%"
                }
            ],
            testimonial: {
                quoteKey: "caseStudies.urbanOasis.results.testimonial",
                name: "Elena Rodriguez",
                titleKey: "caseStudies.urbanOasis.challenge.clientTitle"
            },
            keyMetric: {
                value: "+830%",
                labelKey: "caseStudies.metrics.leadGrowth"
            }
        }
    },
    {
        slug: "neon-bistro",
        titleKey: "caseStudies.neonBistro.title",
        clientKey: "caseStudies.neonBistro.client",
        industry: "gastronomy",
        durationKey: "caseStudies.neonBistro.duration",
        servicesUsed: ["brand-identity", "growth-performance"],
        heroImage: "/images/portfolio/neon-bistro-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.neonBistro.challenge.description",
            clientQuoteKey: "caseStudies.neonBistro.challenge.quote",
            clientName: "Marcus Chen",
            clientTitleKey: "caseStudies.neonBistro.challenge.clientTitle",
            painPointsKeys: [
                "caseStudies.neonBistro.challenge.painPoints.0",
                "caseStudies.neonBistro.challenge.painPoints.1"
            ]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.neonBistro.approach.step1.title",
                    descriptionKey: "caseStudies.neonBistro.approach.step1.description",
                    icon: "Utensils"
                },
                {
                    titleKey: "caseStudies.neonBistro.approach.step2.title",
                    descriptionKey: "caseStudies.neonBistro.approach.step2.description",
                    icon: "Megaphone"
                }
            ]
        },
        gallery: [
            {
                src: "/images/portfolio/neon-bistro-1.jpg",
                altKey: "caseStudies.neonBistro.gallery.1",
                type: "image"
            }
        ],
        results: {
            metrics: [
                {
                    labelKey: "caseStudies.metrics.bookings",
                    before: "60%",
                    after: "100%"
                }
            ],
            testimonial: {
                quoteKey: "caseStudies.neonBistro.results.testimonial",
                name: "Marcus Chen",
                titleKey: "caseStudies.neonBistro.challenge.clientTitle"
            },
            keyMetric: {
                value: "Full",
                labelKey: "caseStudies.metrics.occupancy"
            }
        }
    },
    // Adding more placeholders to reach 6 as requested, using generic keys pattern for speed and consistency
    {
        slug: "tech-flow",
        titleKey: "caseStudies.techFlow.title",
        clientKey: "caseStudies.techFlow.client",
        industry: "events",
        durationKey: "caseStudies.techFlow.duration",
        servicesUsed: ["digital-platforms", "automation"],
        heroImage: "/images/portfolio/tech-flow-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.techFlow.challenge.description",
            clientQuoteKey: "caseStudies.techFlow.challenge.quote",
            clientName: "Sarah Johnson",
            clientTitleKey: "caseStudies.techFlow.challenge.clientTitle",
            painPointsKeys: ["caseStudies.techFlow.challenge.painPoints.0"]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.techFlow.approach.step1.title",
                    descriptionKey: "caseStudies.techFlow.approach.step1.description",
                    icon: "Code"
                }
            ]
        },
        gallery: [],
        results: {
            metrics: [],
            testimonial: {
                quoteKey: "caseStudies.techFlow.results.testimonial",
                name: "Sarah Johnson",
                titleKey: "caseStudies.techFlow.challenge.clientTitle"
            },
            keyMetric: {
                value: "-40h",
                labelKey: "caseStudies.metrics.timeSaved"
            }
        }
    },
    {
        slug: "bella-vita",
        titleKey: "caseStudies.bellaVita.title",
        clientKey: "caseStudies.bellaVita.client",
        industry: "beauty-wellness",
        durationKey: "caseStudies.bellaVita.duration",
        servicesUsed: ["brand-identity", "visual-storytelling"],
        heroImage: "/images/portfolio/bella-vita-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.bellaVita.challenge.description",
            clientQuoteKey: "caseStudies.bellaVita.challenge.quote",
            clientName: "Isabella Martinez",
            clientTitleKey: "caseStudies.bellaVita.challenge.clientTitle",
            painPointsKeys: ["caseStudies.bellaVita.challenge.painPoints.0"]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.bellaVita.approach.step1.title",
                    descriptionKey: "caseStudies.bellaVita.approach.step1.description",
                    icon: "Camera"
                }
            ]
        },
        gallery: [],
        results: {
            metrics: [],
            testimonial: {
                quoteKey: "caseStudies.bellaVita.results.testimonial",
                name: "Isabella Martinez",
                titleKey: "caseStudies.bellaVita.challenge.clientTitle"
            },
            keyMetric: {
                value: "+200%",
                labelKey: "caseStudies.metrics.engagement"
            }
        }
    },
    {
        slug: "smart-fix",
        titleKey: "caseStudies.smartFix.title",
        clientKey: "caseStudies.smartFix.client",
        industry: "home-services",
        durationKey: "caseStudies.smartFix.duration",
        servicesUsed: ["digital-platforms", "seo"],
        heroImage: "/images/portfolio/smart-fix-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.smartFix.challenge.description",
            clientQuoteKey: "caseStudies.smartFix.challenge.quote",
            clientName: "Tom Wilson",
            clientTitleKey: "caseStudies.smartFix.challenge.clientTitle",
            painPointsKeys: ["caseStudies.smartFix.challenge.painPoints.0"]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.smartFix.approach.step1.title",
                    descriptionKey: "caseStudies.smartFix.approach.step1.description",
                    icon: "Wrench"
                }
            ]
        },
        gallery: [],
        results: {
            metrics: [],
            testimonial: {
                quoteKey: "caseStudies.smartFix.results.testimonial",
                name: "Tom Wilson",
                titleKey: "caseStudies.smartFix.challenge.clientTitle"
            },
            keyMetric: {
                value: "#1",
                labelKey: "caseStudies.metrics.ranking"
            }
        }
    },
    {
        slug: "elite-homes",
        titleKey: "caseStudies.eliteHomes.title",
        clientKey: "caseStudies.eliteHomes.client",
        industry: "real-estate",
        durationKey: "caseStudies.eliteHomes.duration",
        servicesUsed: ["visual-storytelling", "ads"],
        heroImage: "/images/portfolio/elite-homes-hero.jpg",
        challenge: {
            descriptionKey: "caseStudies.eliteHomes.challenge.description",
            clientQuoteKey: "caseStudies.eliteHomes.challenge.quote",
            clientName: "Richard Sterling",
            clientTitleKey: "caseStudies.eliteHomes.challenge.clientTitle",
            painPointsKeys: ["caseStudies.eliteHomes.challenge.painPoints.0"]
        },
        approach: {
            steps: [
                {
                    titleKey: "caseStudies.eliteHomes.approach.step1.title",
                    descriptionKey: "caseStudies.eliteHomes.approach.step1.description",
                    icon: "Home"
                }
            ]
        },
        gallery: [],
        results: {
            metrics: [],
            testimonial: {
                quoteKey: "caseStudies.eliteHomes.results.testimonial",
                name: "Richard Sterling",
                titleKey: "caseStudies.eliteHomes.challenge.clientTitle"
            },
            keyMetric: {
                value: "$5M",
                labelKey: "caseStudies.metrics.sales"
            }
        }
    }
];
