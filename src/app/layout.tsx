import type { Metadata } from "next";
import { Averia_Serif_Libre, Inter } from "next/font/google";
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
  return (
    <html lang="en" className={`${averiaSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
