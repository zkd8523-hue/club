import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/features/CartSidebar";
import SessionProvider from "@/components/providers/SessionProvider";
import PayPalProvider from "@/components/providers/PayPalProvider";
import layoutStyles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clubbnb | Premium Nightlife Booking",
  description: "Book tables, bottles, and find party groups for the best clubs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <PayPalProvider>
            <Navbar />
            <main className={layoutStyles.main}>
              {children}
            </main>
            <Footer />
            <CartSidebar />
          </PayPalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
