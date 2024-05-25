import type { Metadata } from "next";
import { Inter, Lobster } from "next/font/google";
import "./globals.css";
import { Html } from "next/document";
import React from "react";
import { Footer, Header } from "../components";
import { AuthProvider } from "../libs/context/authContext";

const inter = Inter({ subsets: ["latin"] });

const lobster = Lobster({
  weight:"400",
  subsets: ['latin'],
  variable: '--lobster-font',
});

export const metadata: Metadata = {
  title: "Cental Food",
  description: "Order for food around online and get it delivered to your doporstep with the click of a button",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lobster.variable}` }>
          <AuthProvider>
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}