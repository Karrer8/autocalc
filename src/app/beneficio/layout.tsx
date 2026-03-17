import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Calculadora Beneficio Neto Autónomos 2026 | ¿Cuánto me queda limpio?",
  description:
    "Calcula gratis tu beneficio neto real como autónomo. Introduce tu facturación y gastos y descubre cuánto te queda después de cuota SS, IVA e IRPF. Datos actualizados 2026.",
  alternates: {
    canonical: "/beneficio",
  },
  openGraph: {
    title:
      "Calculadora Beneficio Neto Autónomos 2026 | ¿Cuánto me queda limpio?",
    description:
      "Calcula gratis tu beneficio neto real como autónomo. Introduce tu facturación y gastos y descubre cuánto te queda después de cuota SS, IVA e IRPF. Datos actualizados 2026.",
    url: `${SITE_URL}/beneficio`,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Calculadora Beneficio Neto Autónomos 2026 | ¿Cuánto me queda limpio?",
    description:
      "Calcula gratis tu beneficio neto real como autónomo. Cuota SS, IVA e IRPF incluidos.",
  },
};

export default function BeneficioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
