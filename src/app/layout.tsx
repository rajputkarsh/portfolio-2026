import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { SITE_URL } from "@/content/profile";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const TITLE = "Utkarsh — Full-Stack Developer & Product Engineer";
const DESCRIPTION =
  "Full-stack developer and product engineer who thinks in product and business, not just code — designing, building, and shipping products end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Utkarsh",
  },
  description: DESCRIPTION,
  applicationName: "Utkarsh",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Utkarsh", url: SITE_URL }],
  creator: "Utkarsh",
  publisher: "Utkarsh",
  keywords: [
    "Utkarsh",
    "Product Engineer",
    "Full-Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Product Engineering",
    "Portfolio",
  ],
  // NOTE: no `alternates.canonical` here — layout metadata is inherited by
  // every route, which would canonicalise all pages to "/". Each page sets
  // its own canonical instead.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "Utkarsh",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: "Utkarsh",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#090d19" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-dvh pt-28">{children}</main>
          <Footer />
          <InstallPrompt />
        </ThemeProvider>
        <ServiceWorkerRegister />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
