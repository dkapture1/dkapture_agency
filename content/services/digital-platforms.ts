import { Service } from "@/types/service";

export const digitalPlatforms: Service = {
    slug: "digital-platforms",
    slugPt: "plataformas-digitais",
    icon: "digital",
    titleKey: "digitalPlatforms.title",
    descriptionKey: "digitalPlatforms.description",
    challengesKey: "digitalPlatforms.challenges",
    solutionsKey: "digitalPlatforms.solutions",
    included: [
        {
            titleKey: "digitalPlatforms.included.webDesign.title",
            descriptionKey: "digitalPlatforms.included.webDesign.description",
            featuresKey: "digitalPlatforms.included.webDesign.features",
        },
        {
            titleKey: "digitalPlatforms.included.ecommerce.title",
            descriptionKey: "digitalPlatforms.included.ecommerce.description",
            featuresKey: "digitalPlatforms.included.ecommerce.features",
        },
        {
            titleKey: "digitalPlatforms.included.seo.title",
            descriptionKey: "digitalPlatforms.included.seo.description",
            featuresKey: "digitalPlatforms.included.seo.features",
        },
    ],
    pricing: [
        {
            nameKey: "pricing.digital.essential",
            price: "$5,000",
            featuresKey: "pricing.digital.essentialFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.digital.professional",
            price: "$12,000",
            popular: true,
            featuresKey: "pricing.digital.professionalFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.digital.enterprise",
            price: "$25,000+",
            featuresKey: "pricing.digital.enterpriseFeatures",
            ctaKey: "pricing.cta",
        },
    ],
    process: [
        {
            stepKey: "process.discovery.step",
            descriptionKey: "process.discovery.description",
        },
        {
            stepKey: "process.uxui.step",
            descriptionKey: "process.uxui.description",
        },
        {
            stepKey: "process.development.step",
            descriptionKey: "process.development.description",
        },
        {
            stepKey: "process.launch.step",
            descriptionKey: "process.launch.description",
        },
    ],
    faqs: [
        {
            questionKey: "digitalPlatforms.faqs.q1.question",
            answerKey: "digitalPlatforms.faqs.q1.answer",
        },
        {
            questionKey: "digitalPlatforms.faqs.q2.question",
            answerKey: "digitalPlatforms.faqs.q2.answer",
        },
        {
            questionKey: "digitalPlatforms.faqs.q3.question",
            answerKey: "digitalPlatforms.faqs.q3.answer",
        },
    ],
    relatedCaseSlug: "bella-vida-spa",
};
