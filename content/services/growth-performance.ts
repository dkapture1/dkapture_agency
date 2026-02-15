import { Service } from "@/types/service";

export const growthPerformance: Service = {
    slug: "growth-performance",
    slugPt: "crescimento-performance",
    icon: "growth",
    titleKey: "growthPerformance.title",
    descriptionKey: "growthPerformance.description",
    challengesKey: "growthPerformance.challenges",
    solutionsKey: "growthPerformance.solutions",
    included: [
        {
            titleKey: "growthPerformance.included.ads.title",
            descriptionKey: "growthPerformance.included.ads.description",
            featuresKey: "growthPerformance.included.ads.features",
        },
        {
            titleKey: "growthPerformance.included.crm.title",
            descriptionKey: "growthPerformance.included.crm.description",
            featuresKey: "growthPerformance.included.crm.features",
        },
        {
            titleKey: "growthPerformance.included.seo.title",
            descriptionKey: "growthPerformance.included.seo.description",
            featuresKey: "growthPerformance.included.seo.features",
        },
    ],
    pricing: [
        {
            nameKey: "pricing.growth.starter",
            price: "$1,500",
            period: "/mo",
            featuresKey: "pricing.growth.starterFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.growth.growth",
            price: "$3,500",
            period: "/mo",
            popular: true,
            featuresKey: "pricing.growth.growthFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.growth.enterprise",
            price: "Custom",
            featuresKey: "pricing.growth.enterpriseFeatures",
            ctaKey: "pricing.cta",
        },
    ],
    process: [
        {
            stepKey: "process.audit.step",
            descriptionKey: "process.audit.description",
        },
        {
            stepKey: "process.strategy.step",
            descriptionKey: "process.strategy.description",
        },
        {
            stepKey: "process.launch.step",
            descriptionKey: "process.launch.description",
        },
        {
            stepKey: "process.optimize.step",
            descriptionKey: "process.optimize.description",
        },
        {
            stepKey: "process.scale.step",
            descriptionKey: "process.scale.description",
        },
    ],
    faqs: [
        {
            questionKey: "growthPerformance.faqs.q1.question",
            answerKey: "growthPerformance.faqs.q1.answer",
        },
        {
            questionKey: "growthPerformance.faqs.q2.question",
            answerKey: "growthPerformance.faqs.q2.answer",
        },
    ],
    relatedCaseSlug: "elite-home-pros",
};
