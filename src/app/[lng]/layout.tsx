import { dir } from 'i18next'
import { languages } from '../i18n/settings'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export type RootLayoutParams = {
  children: React.ReactNode
  params: {
    lng: string
  }
}

export default async function RootLayout({
  children,
  params
}: RootLayoutParams) {
  
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
