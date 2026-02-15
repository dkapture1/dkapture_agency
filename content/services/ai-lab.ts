import { Service } from "@/types/service";

export const aiLab: Service = {
    slug: "ai-lab",
    slugPt: "laboratorio-ia",
    icon: "ai",
    titleKey: "aiLabPage.title",
    descriptionKey: "aiLabPage.description",
    challengesKey: "aiLabPage.challenges",
    solutionsKey: "aiLabPage.solutions",
    included: [
        {
            titleKey: "aiLabPage.included.chatbots.title",
            descriptionKey: "aiLabPage.included.chatbots.description",
            featuresKey: "aiLabPage.included.chatbots.features",
        },
        {
            titleKey: "aiLabPage.included.automation.title",
            descriptionKey: "aiLabPage.included.automation.description",
            featuresKey: "aiLabPage.included.automation.features",
        },
        {
            titleKey: "aiLabPage.included.analytics.title",
            descriptionKey: "aiLabPage.included.analytics.description",
            featuresKey: "aiLabPage.included.analytics.features",
        },
    ],
    pricing: [
        {
            nameKey: "pricing.ai.basic",
            price: "$1,000",
            period: "/mo",
            featuresKey: "pricing.ai.basicFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.ai.pro",
            price: "$2,500",
            period: "/mo",
            popular: true,
            featuresKey: "pricing.ai.proFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.ai.custom",
            price: "Custom",
            featuresKey: "pricing.ai.customFeatures",
            ctaKey: "pricing.cta",
        },
    ],
    process: [
        {
            stepKey: "process.audit.step",
            descriptionKey: "process.audit.description",
        },
        {
            stepKey: "process.integration.step",
            descriptionKey: "process.integration.description",
        },
        {
            stepKey: "process.training.step",
            descriptionKey: "process.training.description",
        },
        {
            stepKey: "process.optimization.step",
            descriptionKey: "process.optimization.description",
        },
    ],
    faqs: [
        {
            questionKey: "aiLabPage.faqs.q1.question",
            answerKey: "aiLabPage.faqs.q1.answer",
        },
        {
            questionKey: "aiLabPage.faqs.q2.question",
            answerKey: "aiLabPage.faqs.q2.answer",
        },
    ],
    relatedCaseSlug: "future-tech-innovations",
};
