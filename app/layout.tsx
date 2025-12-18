import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { LenisProvider } from "@/app/components/LenisProvider";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martim Ramos | Software Engineer & Creative Web Developer",
  description:
    "Martim Ramos - 3rd Year Computer Engineering Student at Instituto Superior Técnico. Building high-performance digital solutions with precision engineering.",
  openGraph: {
    type: "website",
    url: "https://ramosdigital.pt/",
    title: "Martim Ramos | Software Engineer & Creative Web Developer",
    description:
      "3rd Year Computer Engineering Student @ Técnico Lisboa. Building high-performance digital solutions with precision engineering.",
    images: [
      {
        url: "https://ramosdigital.pt/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/assets/img/MR-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0A0A0B] text-white font-sans antialiased overflow-x-hidden`}
      >
        <LanguageProvider>
          <LenisProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
