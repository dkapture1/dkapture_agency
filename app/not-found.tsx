"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white font-sans antialiased">
                <main id="main-content" className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                    <div className="space-y-6 max-w-md">
                        <h1 className="text-6xl font-bold text-orange-500">404</h1>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Page Not Found</h2>
                            <p className="text-neutral-400">
                                The page you are looking for does not exist.
                            </p>
                        </div>
                        <div className="w-full h-px bg-neutral-800 my-6" />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Página Não Encontrada</h2>
                            <p className="text-neutral-400">
                                A página que você está procurando não existe.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Link
                                href="/en"
                                className="px-6 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium"
                            >
                                Go Home
                            </Link>
                            <Link
                                href="/pt"
                                className="px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors font-medium"
                            >
                                Ir para Início
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
