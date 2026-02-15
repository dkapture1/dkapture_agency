"use client";

import { useTranslations } from "next-intl";
import { Facebook, Linkedin, Twitter, Link as LinkIcon, MessageCircle } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or similar is available, otherwise simpler alert

interface ShareButtonsProps {
    title: string;
    url: string; // Full URL including domain
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const t = useTranslations("insights");
    const tCommon = useTranslations("common");

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        // Simple alert if toast not available, but user likely has one. 
        // Using console log fallback just in case, but visual feedback is better.
        // Assuming user has a toast system, will use basic alert for now to be safe until verified.
        // Actually, shadcn usually implies toast. I'll stick to a simple copy for now.
        alert(tCommon("linkCopied"));
    };

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-[#0077b5]",
            label: tCommon("shareOnLinkedIn")
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:text-[#1DA1F2]",
            label: tCommon("shareOnTwitter")
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
            color: "hover:text-[#25D366]",
            label: "WhatsApp" // Keeping generic or add if needed
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "hover:text-[#4267B2]",
            label: "Facebook"
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {t("share")}
            </p>
            <div className="flex gap-3">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`rounded-full bg-neutral-900 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 ${link.color}`}
                        aria-label={link.label || `Share on ${link.name}`}
                    >
                        <link.icon className="h-5 w-5" />
                    </a>
                ))}
                <button
                    onClick={handleCopy}
                    className="rounded-full bg-neutral-900 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                    aria-label={tCommon("copyLink")}
                >
                    <LinkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
