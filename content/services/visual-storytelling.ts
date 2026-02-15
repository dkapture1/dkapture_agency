import { Service } from "@/types/service";

export const visualStorytelling: Service = {
    slug: "visual-storytelling",
    slugPt: "storytelling-visual",
    icon: "storytelling",
    titleKey: "visualStorytelling.title",
    descriptionKey: "visualStorytelling.description",
    challengesKey: "visualStorytelling.challenges",
    solutionsKey: "visualStorytelling.solutions",
    included: [
        {
            titleKey: "visualStorytelling.included.videoProd.title",
            descriptionKey: "visualStorytelling.included.videoProd.description",
            featuresKey: "visualStorytelling.included.videoProd.features",
        },
        {
            titleKey: "visualStorytelling.included.photography.title",
            descriptionKey: "visualStorytelling.included.photography.description",
            featuresKey: "visualStorytelling.included.photography.features",
        },
        {
            titleKey: "visualStorytelling.included.drone.title",
            descriptionKey: "visualStorytelling.included.drone.description",
            featuresKey: "visualStorytelling.included.drone.features",
        },
    ],
    pricing: [
        {
            nameKey: "pricing.visual.contentDay",
            price: "$3,000",
            featuresKey: "pricing.visual.contentDayFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.visual.cinema",
            price: "$8,500",
            popular: true,
            featuresKey: "pricing.visual.cinemaFeatures",
            ctaKey: "pricing.cta",
        },
        {
            nameKey: "pricing.visual.retainer",
            price: "Custom",
            period: "/mo",
            featuresKey: "pricing.visual.retainerFeatures",
            ctaKey: "pricing.cta",
        },
    ],
    process: [
        {
            stepKey: "process.preprod.step",
            descriptionKey: "process.preprod.description",
        },
        {
            stepKey: "process.production.step",
            descriptionKey: "process.production.description",
        },
        {
            stepKey: "process.postprod.step",
            descriptionKey: "process.postprod.description",
        },
        {
            stepKey: "process.delivery.step",
            descriptionKey: "process.delivery.description",
        },
    ],
    faqs: [
        {
            questionKey: "visualStorytelling.faqs.q1.question",
            answerKey: "visualStorytelling.faqs.q1.answer",
        },
        {
            questionKey: "visualStorytelling.faqs.q2.question",
            answerKey: "visualStorytelling.faqs.q2.answer",
        },
    ],
    relatedCaseSlug: "gala-productions",
};
