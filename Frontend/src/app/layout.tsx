import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giovanna – Opere pittoriche",
  description: "Sito ufficiale delle opere pittoriche di Giovanna",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
