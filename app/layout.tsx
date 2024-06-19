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
  applicationName: "Tasty Chef",
  authors: [{ name: "Manuel D.", url: "https://github.com/manueldiamond/" },{name:'TABI'},{name:'Lyrics Jnr'}],
  generator: "Next.js",
  keywords: ["food delivery", "online ordering", "Central Campus", "Tasty Chef"],
  referrer: "origin-when-cross-origin",
  themeColor: "#EF2A39",
  colorScheme: "light",
  creator: "Manuel D. ,TABI, LyricsJnr",
  publisher: "Tasty Chef Inc.",

  openGraph: {
    type: "website",
    url: "https://tastychef.vercel.app",
    title: "Tasty Chef",
    description: "Order food around Central Campus online and have it delivered right to your doorstep!",
    siteName: "Tasty Chef",
    images: [{
      url: "https://i.ibb.co/PxFb4S8/image-2024-06-19-020449669.png",
      
      alt: "Tasty Chef"
    }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@TastyChef",
    title: "Tasty Chef",
    description: "Order food around Central Campus online and have it delivered right to your doorstep!",
    images: ["https://i.ibb.co/PxFb4S8/image-2024-06-19-020449669.png"]
  },

  
  category: "Food & Drink, Delivery App",
  classification: "Online Food Delivery",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} ${lobster.variable}` }>
          <AuthProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </AuthProvider>
      </body>
    </html>
  );
}