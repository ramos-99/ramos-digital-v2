import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { LenisProvider } from "@/app/components/LenisProvider";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0A0A0B] text-white font-sans antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
