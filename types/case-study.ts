export type CaseStudyIndustry =
    | 'home-services'
    | 'gastronomy'
    | 'real-estate'
    | 'events'
    | 'beauty-wellness';

export interface CaseStudy {
    slug: string;
    // All visible text fields are Translation Keys
    titleKey: string;
    clientKey: string;
    industry: CaseStudyIndustry;
    durationKey: string;
    servicesUsed: string[]; // IDs/slugs of services used, to link back
    heroImage: string;

    challenge: {
        descriptionKey: string;
        clientQuoteKey: string;
        clientName: string; // Names might not be translated, but if title is, use key
        clientTitleKey: string;
        clientPhoto?: string;
        painPointsKeys: string[];
    };

    approach: {
        steps: {
            titleKey: string;
            descriptionKey: string;
            icon: string; // lucide icon name or path
        }[];
    };

    gallery: {
        src: string;
        altKey: string;
        type: 'image' | 'video';
    }[];

    results: {
        metrics: {
            labelKey: string;
            before: string; // Numbers/stats usually not translated, but formats might vary. Keeping string.
            after: string;
        }[];
        testimonial: {
            quoteKey: string;
            name: string;
            titleKey: string;
            photo?: string;
        };
        keyMetric: {
            value: string;
            labelKey: string;
        };
    };
}
