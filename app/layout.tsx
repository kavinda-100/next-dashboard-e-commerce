import React from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import {cn} from "@/lib/utils";
import StoreProvider from "@/store/StoreProvider";
import {SessionProvider} from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { EdgeStoreProvider } from '@/lib/edgestore';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Next js dashboard",
  description: "Next js dashboard for ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>
      <SessionProvider>
          <StoreProvider>
              <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
              >
                  <main className="w-full min-h-screen max-w-[1550px] mx-auto space-y-4">
                      <EdgeStoreProvider>{children}</EdgeStoreProvider>
                  </main>
                  <Toaster />
              </ThemeProvider>
          </StoreProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
