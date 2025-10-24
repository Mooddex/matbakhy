import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matbakhy",
  description: "Your Kitchen is here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen flex flex-col">
          <SessionProvider>
           <Nav />
          <main className="flex-grow">
           
            {children}
             <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
            
            </main>
          </SessionProvider>
          <Footer
            title="Powered by Kitchen Makers"
            subtitle="Join a growing network of professionals and homeowners bringing kitchens to life in Egypt."
          />
        </div>
      </body>
    </html>
  );
}
