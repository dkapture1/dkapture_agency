export interface Service {
    slug: string;
    slugPt: string; // explicitly stored for easy access, though routing handles it
    titleKey: string;
    descriptionKey: string;
    icon: "brand" | "digital" | "storytelling" | "growth" | "ai";
    challengesKey: string; // points to an array in messages
    solutionsKey: string; // points to an array in messages
    included: {
        titleKey: string;
        descriptionKey: string;
        featuresKey: string; // points to an array
    }[];
    pricing: {
        nameKey: string;
        price: string;
        period?: string; // e.g. "/mo", or empty for one-time
        featuresKey: string; // points to an array
        popular?: boolean;
        ctaKey: string;
    }[];
    process: {
        stepKey: string;
        descriptionKey: string;
    }[];
    faqs: {
        questionKey: string;
        answerKey: string;
    }[];
    relatedCaseSlug?: string;
}
