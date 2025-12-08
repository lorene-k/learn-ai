import type { Metadata } from "next";
import { Providers } from "./providers/Providers";
import { Outfit } from 'next/font/google';
import { Navbar } from "./components/Navbar";

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: "Learn.ai",
    description: "Learn now.",
};

export default function RootLayout({ children }:
    Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en" className={outfit.className}>
            <body style={{ overflow: 'hidden', background: 'linear-gradient(180deg, #4A00E0 0%, #000000 100%)' }}>
                <Providers>
                        <Navbar />
                        {children}
                </Providers>
            </body>
        </html>
    );
}