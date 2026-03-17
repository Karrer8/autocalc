"use client";

import { useState } from "react";
import { calcularTramo, type ResultadoTramo } from "@/lib/calculadora";
import { TRAMOS } from "@/lib/datos-fiscales";
import ResultCard from "@/components/ResultCard";
import Disclaimer from "@/components/Disclaimer";
import HorizontalBar from "@/components/BarChart";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuántos tramos de cotización de autónomos hay en 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En 2026 hay 15 tramos de cotización para autónomos en España: 6 tramos en la tabla reducida (para rendimientos netos por debajo del SMI) y 9 tramos en la tabla general. Las cuotas van desde 200€/mes en el tramo 1 hasta 530€/mes en el tramo 15. Las cuotas están congeladas respecto a 2025 según el Real Decreto-ley 16/2025.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo sé en qué tramo de autónomos estoy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tu tramo se determina por tu rendimiento neto mensual, que se calcula así: (ingresos anuales - gastos deducibles) × 0,93 / 12. El factor 0,93 corresponde a la deducción del 7% por gastos de difícil justificación. El resultado te sitúa en uno de los 15 tramos, cada uno con una cuota mensual distinta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto es la tarifa plana de autónomos en 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La tarifa plana de autónomos en 2026 es de 80€/mes (88,64€ incluyendo el MEI del 0,9%) durante los primeros 12 meses de actividad. Está disponible para nuevos autónomos que no hayan estado de alta en los 2 años anteriores (3 años si ya disfrutaron de la tarifa plana previamente).",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo cambiar de tramo de cotización durante el año?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, los autónomos pueden cambiar de tramo hasta 6 veces al año, cada dos meses. Esto permite ajustar la cuota si tus ingresos varían a lo largo del año. Los cambios se solicitan a través del portal Import@ss de la Seguridad Social.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora Cuota Autónomos por Tramos",
  url: `${SITE_URL}/cuota`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Simulador gratuito de cuota de autónomos 2026. 15 tramos oficiales con cuotas actualizadas.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AutoCalc", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Calculadora Cuota por Tramos", item: `${SITE_URL}/cuota` },
  ],
};

export default function CuotaPage() {
  const [ingresos, setIngresos] = useState("");
  const [gastos, setGastos] = useState("");
  const [societario, setSocietario] = useState(false);
  const [resultado, setResultado] = useState<ResultadoTramo | null>(null);

  function calcular() {
    const i = parseFloat(ingresos);
    const g = parseFloat(gastos) || 0;
    if (!i || i <= 0) return;
    setResultado(calcularTramo(i, g, { societario }));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-3">
          15 tramos de cotización
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          ¿En qué tramo estoy?
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Descubre tu tramo de cotización y cuánto pagas de cuota de autónomos en 2026.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Ingresos anuales
            <span className="text-slate-400 font-normal"> (sin IVA)</span>
          </label>
          <div className="relative">
            <input type="number" inputMode="decimal" value={ingresos} onChange={(e) => setIngresos(e.target.value)} placeholder="30.000" className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none" />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Gastos anuales deducibles</label>
          <div className="relative">
            <input type="number" inputMode="decimal" value={gastos} onChange={(e) => setGastos(e.target.value)} placeholder="5.000" className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none" />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input type="checkbox" checked={societario} onChange={(e) => setSocietario(e.target.checked)} className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500/20" />
          <span className="text-sm text-slate-600">Autónomo societario</span>
        </label>

        <button onClick={calcular} className="w-full py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all text-base cursor-pointer shadow-sm shadow-brand-200 active:scale-[0.98]">
          Calcular mi tramo
        </button>
      </div>

      {/* Results */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Tu tramo" value={`Tramo ${resultado.tramo.id}`} sublabel={`Tabla ${resultado.tramo.tabla}`} highlight />
            <ResultCard label="Cuota mensual" value={fmt(resultado.cuotaMensual)} highlight />
            <ResultCard label="Cuota anual" value={fmt(resultado.cuotaAnual)} />
            <ResultCard label="Rendimiento neto mensual" value={fmt(resultado.rendimientoNetoMensual)} sublabel="Tras deducción gastos difícil justificación" />
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Comparativa de cuotas por tramo</h3>
            <HorizontalBar items={TRAMOS.map((t) => ({ label: `T${t.id}`, value: t.cuotaMensual, color: t.id === resultado.tramo.id ? "#2563eb" : "#e2e8f0" }))} />
          </div>
        </div>
      )}

      {/* Tabla de tramos */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Tabla completa de tramos 2026</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden min-w-[420px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tramo</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rend. netos/mes</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cuota/mes</th>
                </tr>
              </thead>
              <tbody>
                {TRAMOS.map((t) => (
                  <tr key={t.id} className={`border-b border-slate-100 last:border-0 transition-colors ${resultado?.tramo.id === t.id ? "bg-brand-50" : "hover:bg-slate-50"}`}>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${resultado?.tramo.id === t.id ? "text-brand-700" : "text-slate-900"}`}>{t.id}</span>
                      <span className="text-xs text-slate-400 ml-1.5">{t.tabla}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 tabular-nums">
                      {t.max === Infinity ? `> ${fmt(t.min - 0.01)}` : `${fmt(t.min)} – ${fmt(t.max)}`}
                    </td>
                    <td className={`py-3 px-4 text-right font-medium tabular-nums ${resultado?.tramo.id === t.id ? "text-brand-700" : "text-slate-900"}`}>
                      ~{fmt(t.cuotaMensual)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Disclaimer />

      {/* SEO Content */}
      <section className="mt-16 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Cuota de autónomos 2026: sistema de cotización por tramos</h2>

        <p className="text-slate-600 leading-relaxed">
          Desde 2023, los autónomos en España cotizan a la Seguridad Social según un <strong>sistema de 15 tramos basado en sus rendimientos netos reales</strong>. En 2026, las cuotas permanecen congeladas respecto a 2025 según el Real Decreto-ley 16/2025, con el único cambio del incremento del Mecanismo de Equidad Intergeneracional (MEI) al 0,9%.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">¿Cómo se calcula el rendimiento neto?</h3>

        <p className="text-slate-600 leading-relaxed">
          La Seguridad Social determina tu tramo a partir de tu <strong>rendimiento neto mensual</strong>. Para calcularlo, toma tus ingresos anuales totales (sin IVA), resta todos los gastos deducibles de tu actividad, y aplica la deducción por gastos de difícil justificación: un 7% para autónomos persona física o un 3% para autónomos societarios. El resultado dividido entre 12 meses es tu rendimiento neto mensual, que te sitúa en uno de los 15 tramos.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Tabla reducida vs. tabla general</h3>

        <p className="text-slate-600 leading-relaxed">
          Los primeros 6 tramos forman la <strong>tabla reducida</strong>, para autónomos con rendimientos netos por debajo del Salario Mínimo Interprofesional (hasta 1.700€/mes). Las cuotas van de 200€ a 294€. Los tramos 7 a 15 componen la <strong>tabla general</strong>, con cuotas desde 320€ hasta 530€ mensuales para quienes superen los 6.000€/mes de rendimiento neto. El tipo de cotización total es del 31,3% sobre la base de cotización correspondiente.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Cambios de tramo y regularización</h3>

        <p className="text-slate-600 leading-relaxed">
          Una ventaja del sistema actual es su <strong>flexibilidad</strong>: puedes cambiar de tramo hasta 6 veces al año a través del portal Import@ss. Esto es útil si tu facturación es irregular. Al final del ejercicio, la Seguridad Social regulariza tu situación comparando las cuotas pagadas con tus rendimientos reales declarados en la renta. Si has pagado de más, te devuelven; si has pagado de menos, te reclaman la diferencia. Por eso es importante elegir bien tu tramo desde el principio.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">MEI 2026: el 0,9% adicional</h3>

        <p className="text-slate-600 leading-relaxed">
          El Mecanismo de Equidad Intergeneracional (MEI) sube al <strong>0,9% en 2026</strong> (desde el 0,8% de 2025). Se aplica sobre la base de cotización y se reparte entre el autónomo y, en su caso, la empresa. Para los autónomos, esto supone un incremento de entre 6€ y 24€ mensuales adicionales según la base elegida. Incluso la tarifa plana lo incluye: 88,64€ frente a los 80€ base.
        </p>
      </section>
    </div>
  );
}
