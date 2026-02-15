"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const t = useTranslations("common");

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <div>
                        <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                            <Home className="h-4 w-4" />
                            <span className="sr-only">{t("home")}</span>
                        </Link>
                    </div>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-600" aria-hidden="true" />
                            {item.href ? (
                                <Link
                                    href={item.href as any}
                                    className="ml-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-2 text-sm font-medium text-neutral-200" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
