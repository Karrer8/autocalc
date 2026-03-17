"use client";

import { useState } from "react";
import { calcularBeneficio, type ResultadoBeneficio } from "@/lib/calculadora";
import ResultCard from "@/components/ResultCard";
import Disclaimer from "@/components/Disclaimer";
import DonutChart from "@/components/DonutChart";
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
      name: "¿Cómo se calcula el beneficio neto de un autónomo en España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El beneficio neto se calcula restando a la facturación mensual los gastos deducibles, la cuota de Seguridad Social (según tu tramo de cotización), el IVA trimestral (modelo 303) y el IRPF trimestral (modelo 130, 20% sobre el beneficio). Además, se aplica una deducción del 7% por gastos de difícil justificación para autónomos persona física.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto se queda un autónomo que factura 2.500€ al mes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un autónomo que factura 2.500€/mes sin gastos se quedaría aproximadamente con 1.400-1.600€ netos, dependiendo de su tramo de cotización. Se descuentan la cuota de autónomos (~330€), IVA trimestral e IRPF trimestral. La cifra exacta varía según los gastos deducibles que tenga.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué impuestos paga un autónomo trimestralmente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los autónomos pagan trimestralmente el IVA (modelo 303, diferencia entre IVA cobrado y pagado) y el IRPF (modelo 130, 20% sobre el beneficio del trimestre menos retenciones y pagos anteriores). Además, pagan mensualmente la cuota de Seguridad Social según su tramo de rendimiento neto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto paga de cuota un nuevo autónomo en 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los nuevos autónomos en 2026 pagan la tarifa plana de 80€/mes (88,64€ con MEI) durante los primeros 12 meses de actividad. Después, pasan al sistema de tramos según sus rendimientos netos reales, con cuotas que van desde 200€ hasta 530€ mensuales.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora Beneficio Neto Autónomos",
  url: `${SITE_URL}/beneficio`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  description:
    "Calcula tu beneficio neto real como autónomo en España. Cuota SS, IVA e IRPF incluidos.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AutoCalc",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculadora Beneficio Neto",
      item: `${SITE_URL}/beneficio`,
    },
  ],
};

export default function BeneficioPage() {
  const [facturacion, setFacturacion] = useState("");
  const [gastos, setGastos] = useState("");
  const [nuevoAutonomo, setNuevoAutonomo] = useState(false);
  const [societario, setSocietario] = useState(false);
  const [resultado, setResultado] = useState<ResultadoBeneficio | null>(null);

  function calcular() {
    const f = parseFloat(facturacion);
    const g = parseFloat(gastos) || 0;
    if (!f || f <= 0) return;
    setResultado(calcularBeneficio(f, g, { nuevoAutonomo, societario }));
  }

  const donutData = resultado
    ? [
        { name: "Beneficio neto", value: Math.max(0, resultado.beneficioNetoMensual), color: "#10b981" },
        { name: "Cuota SS", value: resultado.cuotaSS, color: "#3b82f6" },
        { name: "IVA (mensual)", value: resultado.ivaTrimestral / 3, color: "#f59e0b" },
        { name: "IRPF (mensual)", value: resultado.irpfTrimestral / 3, color: "#f43f5e" },
        { name: "Gastos", value: resultado.gastosMensuales, color: "#94a3b8" },
      ]
    : [];

  const barData = resultado
    ? [
        { label: "Cuota Seg. Social", value: resultado.cuotaSS, color: "#3b82f6" },
        { label: "IVA mensual (Mod. 303)", value: resultado.ivaTrimestral / 3, color: "#f59e0b" },
        { label: "IRPF mensual (Mod. 130)", value: resultado.irpfTrimestral / 3, color: "#f43f5e" },
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-3">
          Calculadora principal
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          ¿Cuánto me queda limpio?
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Calcula tu beneficio neto real después de cuota de autónomos, IVA e IRPF.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Facturación mensual media
            <span className="text-slate-400 font-normal"> (sin IVA)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={facturacion}
              onChange={(e) => setFacturacion(e.target.value)}
              placeholder="2.500"
              className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none"
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Gastos mensuales medios
            <span className="text-slate-400 font-normal"> (sin IVA)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={gastos}
              onChange={(e) => setGastos(e.target.value)}
              placeholder="300"
              className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none"
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={nuevoAutonomo}
              onChange={(e) => setNuevoAutonomo(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500/20"
            />
            <span className="text-sm text-slate-600">Nuevo autónomo (tarifa plana)</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={societario}
              onChange={(e) => setSocietario(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500/20"
            />
            <span className="text-sm text-slate-600">Societario</span>
          </label>
        </div>

        <button
          onClick={calcular}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all text-base cursor-pointer shadow-sm shadow-emerald-200 active:scale-[0.98]"
        >
          Calcular beneficio neto
        </button>
      </div>

      {/* Results */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Beneficio neto mensual" value={fmt(resultado.beneficioNetoMensual)} highlight />
            <ResultCard label="Beneficio neto anual" value={fmt(resultado.beneficioNetoAnual)} highlight />
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Desglose de tu facturación mensual</h3>
            <DonutChart data={donutData} centerLabel="Neto" centerValue={fmt(resultado.beneficioNetoMensual)} />
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Lo que pagas en impuestos cada mes</h3>
            <HorizontalBar items={barData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Cuota Seguridad Social" value={fmt(resultado.cuotaSS) + "/mes"} sublabel={`Tramo ${resultado.tramo.id} (tabla ${resultado.tramo.tabla})`} />
            <ResultCard label="Rendimiento neto mensual" value={fmt(resultado.rendimientoNetoMensual)} sublabel="Determina tu tramo de cotización" />
            <ResultCard label="IVA trimestral (Mod. 303)" value={fmt(resultado.ivaTrimestral)} sublabel="IVA repercutido - IVA soportado" />
            <ResultCard label="IRPF trimestral (Mod. 130)" value={fmt(resultado.irpfTrimestral)} sublabel="20% sobre beneficio trimestral" />
          </div>
        </div>
      )}

      <Disclaimer />

      {/* SEO Content */}
      <section className="mt-16 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Cómo calcular el beneficio neto real de un autónomo en 2026</h2>

        <p className="text-slate-600 leading-relaxed">
          Si eres autónomo en España, la pregunta más importante que debes hacerte es: <strong>¿cuánto me queda limpio de lo que facturo?</strong> La respuesta no es tan sencilla como restar gastos a ingresos, ya que hay tres grandes partidas fiscales que reducen significativamente tu beneficio: la cuota de la Seguridad Social, el IVA trimestral y el IRPF.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Fórmula del rendimiento neto</h3>

        <p className="text-slate-600 leading-relaxed">
          El primer paso es calcular tu <strong>rendimiento neto mensual</strong>, que es lo que la Seguridad Social utiliza para asignarte un tramo de cotización. La fórmula oficial es: ingresos anuales menos gastos deducibles menos cuotas de Seguridad Social, multiplicado por 0,93 (se aplica una deducción del 7% por gastos de difícil justificación para autónomos persona física, o del 3% para societarios), dividido entre 12 meses. Este rendimiento neto determina en cuál de los 15 tramos de cotización te encuentras, con cuotas que van desde 200€ hasta 530€ mensuales en 2026.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">El IVA trimestral: Modelo 303</h3>

        <p className="text-slate-600 leading-relaxed">
          Cada trimestre debes presentar el <strong>modelo 303</strong> y pagar la diferencia entre el IVA que has cobrado a tus clientes (IVA repercutido, normalmente el 21%) y el IVA que has pagado en tus gastos profesionales (IVA soportado). Si facturas 2.500€/mes con gastos de 300€/mes, el IVA trimestral neto sería aproximadamente 1.386€ (tres meses de diferencia entre IVA cobrado y pagado). Este dinero no es tuyo: lo recaudas para Hacienda.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">El IRPF trimestral: Modelo 130</h3>

        <p className="text-slate-600 leading-relaxed">
          Además, trimestralmente presentas el <strong>modelo 130</strong> de pago fraccionado del IRPF. Se calcula aplicando el 20% sobre el beneficio acumulado del año (ingresos menos gastos, incluyendo las cuotas de Seguridad Social), restando las retenciones que te hayan practicado tus clientes y los pagos fraccionados de trimestres anteriores. Este es un adelanto de tu declaración de la renta anual.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Tarifa plana para nuevos autónomos</h3>

        <p className="text-slate-600 leading-relaxed">
          Si acabas de darte de alta como autónomo, puedes acogerte a la <strong>tarifa plana de 80€/mes</strong> (88,64€ incluyendo el MEI del 0,9%) durante los primeros 12 meses. Esto supone un ahorro significativo frente a la cuota por tramos. Nuestra calculadora tiene en cuenta esta opción para darte una estimación más precisa de tu beneficio neto real durante el primer año de actividad.
        </p>
      </section>
    </div>
  );
}
