import type { Metadata } from "next";
import { Inter, Lobster, Poppins } from "next/font/google";
import "./globals.css";
import { Html } from "next/document";
import React from "react";
import { Footer, Header } from "../components";
import { AuthProvider } from "../libs/context/authContext";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
  variable:'--poppins-font'
});

const lobster = Lobster({
  weight:"400",
  subsets: ['latin'],
  variable: '--lobster-font',
});

export const metadata: Metadata = {
  title: "Tasty Chef",
  description: "Order food around Central Campus online and have it delivered right to your doorstep!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.className} ${lobster.variable}` }>
          <AuthProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </AuthProvider>
      </body>
    </html>
  );
}