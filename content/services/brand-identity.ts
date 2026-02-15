import { Service } from "@/types/service";

export const brandIdentity: Service = {
    slug: "brand-identity",
    slugPt: "identidade-visual",
    icon: "brand",
    titleKey: "brandIdentity.title",
    descriptionKey: "brandIdentity.description",
    challengesKey: "brandIdentity.challenges",
    solutionsKey: "brandIdentity.solutions",
    included: [
        {
            titleKey: "brandIdentity.included.logo.title",
            descriptionKey: "brandIdentity.included.logo.description",
            featuresKey: "brandIdentity.included.logo.features",
        },
        {
            titleKey: "brandIdentity.included.guidelines.title",
            descriptionKey: "brandIdentity.included.guidelines.description",
            featuresKey: "brandIdentity.included.guidelines.features",
        },
        {
            titleKey: "brandIdentity.included.stationery.title",
            descriptionKey: "brandIdentity.included.stationery.description",
            featuresKey: "brandIdentity.included.stationery.features",
        },
    ],
    pricing: [
        {
            nameKey: "pricing.brand.essential",
            price: "$2,500",
            featuresKey: "pricing.brand.essentialFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.brand.professional",
            price: "$4,500",
            popular: true,
            featuresKey: "pricing.brand.professionalFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.brand.enterprise",
            price: "Custom",
            featuresKey: "pricing.brand.enterpriseFeatures",
            ctaKey: "pricing.cta",
        },
    ],
    process: [
        {
            stepKey: "process.discovery.step",
            descriptionKey: "process.discovery.description",
        },
        {
            stepKey: "process.strategy.step",
            descriptionKey: "process.strategy.description",
        },
        {
            stepKey: "process.design.step",
            descriptionKey: "process.design.description",
        },
        {
            stepKey: "process.delivery.step",
            descriptionKey: "process.delivery.description",
        },
    ],
    faqs: [
        {
            questionKey: "brandIdentity.faqs.q1.question",
            answerKey: "brandIdentity.faqs.q1.answer",
        },
        {
            questionKey: "brandIdentity.faqs.q2.question",
            answerKey: "brandIdentity.faqs.q2.answer",
        },
        {
            questionKey: "brandIdentity.faqs.q3.question",
            answerKey: "brandIdentity.faqs.q3.answer",
        },
    ],
    relatedCaseSlug: "sabor-brasileiro",
};
