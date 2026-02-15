import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Info, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Custom Components ---

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip" | "success"; children: React.ReactNode }) {
    const icons = {
        info: Info,
        warning: AlertTriangle,
        tip: CheckCircle, // Using CheckCircle for tip for now, or lightbulb if available
        success: CheckCircle,
    };
    const Icon = icons[type] || Info;

    const styles = {
        info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
        warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200",
        tip: "bg-green-500/10 border-green-500/20 text-green-200",
        success: "bg-green-500/10 border-green-500/20 text-green-200",
    };

    return (
        <div className={cn("my-8 flex gap-4 rounded-lg border p-4", styles[type])}>
            <Icon className="h-6 w-6 flex-shrink-0" />
            <div className="text-sm prose-p:my-0 prose-strong:text-inherit">{children}</div>
        </div>
    );
}

function StatCard({ value, label, description }: { value: string; label: string; description: string }) {
    return (
        <div className="my-8 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
            <div className="mb-2 font-display text-4xl font-bold text-orange-500 md:text-5xl">{value}</div>
            <div className="mb-2 text-lg font-bold text-white">{label}</div>
            <div className="text-sm text-neutral-400">{description}</div>
        </div>
    );
}

function CTABanner({ title, buttonText, link }: { title: string; buttonText: string; link: string }) {
    return (
        <div className="my-10 overflow-hidden rounded-2xl bg-orange-600 px-6 py-8 text-center md:px-12 md:py-12">
            <h3 className="mb-6 font-display text-2xl font-bold uppercase text-white md:text-3xl">{title}</h3>
            <Link
                href={link as any}
                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-orange-600 transition-transform hover:scale-105"
            >
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    );
}

function ComparisonTable({ headers = [], rows = [] }: { headers: string[]; rows: any[] }) {
    if (!headers.length) return null;

    return (
        <div className="my-8 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/50">
            <table className="w-full text-left text-sm text-neutral-400">
                <thead className="bg-neutral-900 text-xs font-bold uppercase text-neutral-200">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-6 py-3">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                            <td className="px-6 py-4">{row[Object.keys(row)[1]]}</td> {/* Assuming order matches headers logic roughly, simple implementation */}
                            <td className="px-6 py-4 text-orange-500 font-medium">{row[Object.keys(row)[2]]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const components = {
    Callout,
    StatCard,
    CTABanner,
    ComparisonTable,
    Link,
    Image,
};

interface BlogContentProps {
    content: string; // Raw MDX source
}

export function BlogContent({ content }: BlogContentProps) {
    return (
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-img:rounded-xl">
            <MDXRemote source={content} components={components} />
        </div>
    );
}
