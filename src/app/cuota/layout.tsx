import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Calculadora Cuota Autónomos 2026 | Tramos y Simulador Gratis",
  description:
    "Simulador gratuito de cuota de autónomos 2026. 15 tramos oficiales, MEI 0,9%, tarifa plana. Descubre tu tramo exacto sin registro.",
  alternates: {
    canonical: "/cuota",
  },
  openGraph: {
    title:
      "Calculadora Cuota Autónomos 2026 | Tramos y Simulador Gratis",
    description:
      "Simulador gratuito de cuota de autónomos 2026. 15 tramos oficiales, MEI 0,9%, tarifa plana. Descubre tu tramo exacto sin registro.",
    url: `${SITE_URL}/cuota`,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Calculadora Cuota Autónomos 2026 | Tramos y Simulador Gratis",
    description:
      "Simulador gratuito de cuota de autónomos 2026. 15 tramos oficiales.",
  },
};

export default function CuotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
