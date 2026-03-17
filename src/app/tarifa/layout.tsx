import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Calculadora Tarifa Horaria Autónomo 2026 | ¿Cuánto cobrar por hora?",
  description:
    "Calcula la tarifa mínima por hora que necesitas cobrar como autónomo para cubrir impuestos y tener el beneficio que deseas.",
  alternates: {
    canonical: "/tarifa",
  },
  openGraph: {
    title:
      "Calculadora Tarifa Horaria Autónomo 2026 | ¿Cuánto cobrar por hora?",
    description:
      "Calcula la tarifa mínima por hora que necesitas cobrar como autónomo para cubrir impuestos y tener el beneficio que deseas.",
    url: `${SITE_URL}/tarifa`,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Calculadora Tarifa Horaria Autónomo 2026 | ¿Cuánto cobrar por hora?",
    description:
      "Calcula tu tarifa horaria mínima como autónomo/freelance en España.",
  },
};

export default function TarifaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
