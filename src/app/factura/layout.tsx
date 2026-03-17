import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Simulador de Factura Autónomo 2026 | IVA y Retención IRPF",
  description:
    "Simula tu factura como autónomo con IVA 21% y retención IRPF. Calcula el total a cobrar y lo que realmente ingresarás.",
  alternates: {
    canonical: "/factura",
  },
  openGraph: {
    title:
      "Simulador de Factura Autónomo 2026 | IVA y Retención IRPF",
    description:
      "Simula tu factura como autónomo con IVA 21% y retención IRPF. Calcula el total a cobrar y lo que realmente ingresarás.",
    url: `${SITE_URL}/factura`,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Simulador de Factura Autónomo 2026 | IVA y Retención IRPF",
    description:
      "Simula tu factura de autónomo: IVA, retención IRPF y total a cobrar.",
  },
};

export default function FacturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
