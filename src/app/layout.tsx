import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "AutoCalc | Calculadoras Gratuitas para Autónomos en España 2026",
    template: "%s | AutoCalc",
  },
  description:
    "Suite de calculadoras gratuitas para autónomos: beneficio neto, cuota por tramos, tarifa horaria y simulador de factura. Datos actualizados 2026.",
  keywords:
    "calculadora autónomos, cuota autónomos 2026, IRPF autónomos, IVA trimestral, tarifa horaria freelance, cuánto me queda limpio, simulador factura autónomo, tramos cotización autónomos",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "AutoCalc | Calculadoras Gratuitas para Autónomos en España 2026",
    description:
      "Suite de calculadoras gratuitas para autónomos: beneficio neto, cuota por tramos, tarifa horaria y simulador de factura. Datos actualizados 2026.",
    url: SITE_URL,
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AutoCalc | Calculadoras Gratuitas para Autónomos en España 2026",
    description:
      "Suite de calculadoras gratuitas para autónomos: beneficio neto, cuota por tramos, tarifa horaria y simulador de factura. Datos actualizados 2026.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
