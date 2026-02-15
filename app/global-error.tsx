"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white font-sans antialiased">
                <main id="main-content" className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                    <div className="space-y-6 max-w-md">
                        <h1 className="text-6xl font-bold text-red-600">500</h1>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Critical System Error</h2>
                            <p className="text-neutral-400">
                                Something went wrong on our end. Please try refreshing the page.
                            </p>
                        </div>
                        <div className="w-full h-px bg-neutral-800 my-6" />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Erro Crítico do Sistema</h2>
                            <p className="text-neutral-400">
                                Algo deu errado do nosso lado. Por favor, tente recarregar a página.
                            </p>
                        </div>
                        <div className="pt-6">
                            <button
                                onClick={() => reset()}
                                className="px-6 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium"
                            >
                                Refresh / Recarregar
                            </button>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
