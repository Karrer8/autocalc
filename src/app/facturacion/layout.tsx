import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "¿Cuánto necesito facturar como autónomo? | Calculadora 2026",
  description:
    "Calcula cuánto necesitas facturar para conseguir el sueldo neto que deseas como autónomo. Incluye cuota SS, IVA e IRPF. Gratis y sin registro.",
  alternates: {
    canonical: "/facturacion",
  },
  openGraph: {
    title: "¿Cuánto necesito facturar como autónomo? | Calculadora 2026",
    description:
      "Calcula cuánto necesitas facturar para conseguir el sueldo neto que deseas como autónomo. Incluye cuota SS, IVA e IRPF. Gratis y sin registro.",
    url: `${SITE_URL}/facturacion`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Cuánto necesito facturar como autónomo? | Calculadora 2026",
    description:
      "Calcula cuánto necesitas facturar para conseguir el sueldo neto que deseas como autónomo. Incluye cuota SS, IVA e IRPF. Gratis y sin registro.",
  },
};

export default function FacturacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
