import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bebas_Neue, Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Silver Screen | Elevating Entertainment, One Stream at a Time.",
  description: "Siver Screen index page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} ${bebas.variable} bg-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
