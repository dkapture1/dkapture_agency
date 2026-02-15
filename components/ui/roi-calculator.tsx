"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Zap } from "lucide-react";

export function RoiCalculator() {
    const t = useTranslations("aiLab.calculator");
    const locale = useLocale();

    // Default values
    const [adSpend, setAdSpend] = useState([5000]);
    const [leads, setLeads] = useState([100]);
    const [conversion, setConversion] = useState([3]);
    const [dealValue, setDealValue] = useState([2000]);

    // Derived state for results
    const [results, setResults] = useState({
        currentRevenue: 0,
        projectedRevenue: 0,
        annualSavings: 0,
        roi: 0,
    });

    // Constants from specs
    const AI_LEAD_INCREASE = 0.25; // 25% more leads
    const AI_CONVERSION_BOOST = 0.15; // 15% better conversion (relative)
    const AI_COST_REDUCTION = 0.20; // 20% operational efficiency

    useEffect(() => {
        const currentLeads = leads[0];
        const currentConv = conversion[0] / 100;
        const avgDeal = dealValue[0];
        const spend = adSpend[0];

        // Current calculations
        const currentMonthlyRevenue = currentLeads * currentConv * avgDeal;

        // Projected calculations
        const projectedLeads = currentLeads * (1 + AI_LEAD_INCREASE);
        const projectedConv = currentConv * (1 + AI_CONVERSION_BOOST);
        const projectedMonthlyRevenue = projectedLeads * projectedConv * avgDeal;

        // Savings (Operational efficiency based on ad spend/budget management optimization + time saved)
        // Simplified Logic: 20% of ad spend is saved/reallocated more efficiently
        const monthlySavings = spend * AI_COST_REDUCTION;
        const annualSavings = monthlySavings * 12;

        const additionalMonthlyRevenue = projectedMonthlyRevenue - currentMonthlyRevenue;

        // ROI typically: (Gain from Investment - Cost of Investment) / Cost of Investment
        // Here we show ROI as percentage improvement in revenue
        const roi = currentMonthlyRevenue > 0
            ? ((projectedMonthlyRevenue - currentMonthlyRevenue) / currentMonthlyRevenue) * 100
            : 0;

        setResults({
            currentRevenue: currentMonthlyRevenue,
            projectedRevenue: projectedMonthlyRevenue,
            annualSavings: annualSavings,
            roi: roi,
        });
    }, [adSpend, leads, conversion, dealValue]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <section id="roi-calculator" className="container mx-auto px-4 py-24">
            <div className="mb-12 text-center">
                <h2 className="mb-4 font-display text-3xl font-bold uppercase md:text-5xl">
                    {t("title")}
                </h2>
                <p className="text-xl text-neutral-400">
                    {t("subtitle")}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Inputs */}
                <Card className="border-neutral-800 bg-neutral-900/50 p-6 lg:col-span-7 lg:p-8">
                    <div className="space-y-8">
                        {/* Ad Spend */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="font-medium text-neutral-300">{t("inputs.adSpend")}</label>
                                <span className="font-bold text-orange-500">{formatCurrency(adSpend[0])}</span>
                            </div>
                            <Slider
                                value={adSpend}
                                onValueChange={setAdSpend}
                                min={1000}
                                max={50000}
                                step={500}
                                className="w-full"
                            />
                        </div>

                        {/* Leads */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="font-medium text-neutral-300">{t("inputs.leads")}</label>
                                <span className="font-bold text-orange-500">{leads[0]}</span>
                            </div>
                            <Slider
                                value={leads}
                                onValueChange={setLeads}
                                min={10}
                                max={500}
                                step={10}
                                className="w-full"
                            />
                        </div>

                        {/* Conversion */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="font-medium text-neutral-300">{t("inputs.conversion")}</label>
                                <span className="font-bold text-orange-500">{conversion[0]}%</span>
                            </div>
                            <Slider
                                value={conversion}
                                onValueChange={setConversion}
                                min={1}
                                max={20}
                                step={0.5}
                                className="w-full"
                            />
                        </div>

                        {/* Deal Value */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="font-medium text-neutral-300">{t("inputs.dealValue")}</label>
                                <span className="font-bold text-orange-500">{formatCurrency(dealValue[0])}</span>
                            </div>
                            <Slider
                                value={dealValue}
                                onValueChange={setDealValue}
                                min={500}
                                max={50000}
                                step={500}
                                className="w-full"
                            />
                        </div>
                    </div>
                </Card>

                {/* Outputs */}
                <div className="flex flex-col gap-4 lg:col-span-5">
                    <Card className="flex-1 border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-6 lg:p-8">
                        <div className="space-y-6">
                            <div className="rounded-lg bg-neutral-800/50 p-4">
                                <div className="mb-1 flex items-center text-sm text-neutral-400">
                                    <Calculator className="mr-2 h-4 w-4" />
                                    {t("outputs.currentRevenue")}
                                </div>
                                <div className="text-2xl font-bold text-neutral-300">
                                    {formatCurrency(results.currentRevenue)}<span className="text-sm font-normal text-neutral-500">{t("perMonth")}</span>
                                </div>
                            </div>

                            <motion.div
                                key={results.projectedRevenue}
                                initial={{ scale: 0.95, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-6"
                            >
                                <div className="mb-2 flex items-center text-sm font-medium text-orange-400">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    {t("outputs.projectedRevenue")}
                                </div>
                                <div className="text-4xl font-bold text-white">
                                    {formatCurrency(results.projectedRevenue)}<span className="text-sm font-normal text-neutral-400">{t("perMonth")}</span>
                                </div>
                                <div className="mt-2 text-sm text-green-400">
                                    +{Math.round(results.roi)}% {t("outputs.roi")}
                                </div>
                            </motion.div>

                            <div className="rounded-lg bg-green-900/10 p-4 border border-green-500/20">
                                <div className="mb-1 flex items-center text-sm text-green-400">
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    {t("outputs.annualSavings")}
                                </div>
                                <div className="text-2xl font-bold text-green-500">
                                    {formatCurrency(results.annualSavings)}<span className="text-sm font-normal text-green-700/70">{t("perYear")}</span>
                                </div>
                            </div>

                            <button className="w-full rounded-full bg-white px-6 py-4 font-bold text-black transition-colors hover:bg-neutral-200">
                                {t("outputs.bookCall")}
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
