// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense} from 'react';
import PreLoader from '@/components/ui/PreLoader';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import AddBootstrap from "./AddBootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helper Buddy",
  description: "Generated by create next app",
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
        <Suspense fallback={<PreLoader />}>
          <AuthProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">
              <AddBootstrap />
              {children}
            </main>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
