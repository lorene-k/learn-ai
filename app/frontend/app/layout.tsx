import type { Metadata } from "next";
import { Providers } from "./providers/Providers";
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400','500','700'] });

export const metadata: Metadata = {
    title: "Learn.ai",
    description: "Learn now.",
};

export default function RootLayout({ children }:
    Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en" className={outfit.className}>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}