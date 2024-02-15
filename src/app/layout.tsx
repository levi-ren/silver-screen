import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silver Screen",
  description: "Stream movies at your fingertips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.className} bg-black`}>{children}</body>
    </html>
  );
}
