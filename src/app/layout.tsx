import type { Metadata } from "next";
import { Averia_Serif_Libre, Inter } from "next/font/google";
import { SIDEBAR_SCRIPT } from "@/components/book/sidebar-state";
import "./globals.css";

const averiaSerif = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-averia-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Unive brand book", template: "%s · Unive brand book" },
  description: "Logo, loaders, colour, type, gradients and UI components for Unive.",
  icons: { icon: "/logo/favicon.svg", apple: "/logo/app-icon-ink.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning: the book sets data-sidebar on <html> before
  // hydration (components/book/sidebar-state.ts), from the script below.
  return (
    <html lang="en" className={`${averiaSerif.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Fold the book's sidebar before it paints if it was folded last
            time. Here, not in the book layout: the root layout is only ever
            rendered on the server, so React never re-renders the script on a
            client navigation (which it warns about, and never runs). */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party */}
        <script dangerouslySetInnerHTML={{ __html: SIDEBAR_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
