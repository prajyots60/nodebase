import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "jotai";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nodebase | Automate Your Workflows",
  description: "Nodebase is the ultimate workflow automation platform to connect your apps and automate your business processes.",
  icons: {
    icon: [
      {
        url: "/logos/logo.svg",
        href: "/logos/logo.svg",
      }
    ]
  },
  openGraph: {
    title: "Nodebase | Automate Your Workflows",
    description: "The ultimate workflow automation platform to connect your apps and automate your business processes.",
    url: "https://nodebase.com",
    siteName: "Nodebase",
    images: [
      {
        url: "/logos/logo.svg",
        width: 800,
        height: 600,
        alt: "Nodebase Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodebase | Automate Your Workflows",
    description: "The ultimate workflow automation platform.",
    images: ["/logos/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <TRPCReactProvider>
            <NuqsAdapter>
              <Provider>
                {children}
                <Toaster />
              </Provider>
            </NuqsAdapter>
          </TRPCReactProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
