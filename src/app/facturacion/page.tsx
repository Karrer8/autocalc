"use client";

import { useState } from "react";
import { calcularFacturacionNecesaria, type ResultadoFacturacion } from "@/lib/calculadora";
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
      name: "¿Cuánto necesito facturar para ganar 2.000€ limpios como autónomo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para llevarte 2.000€ netos al mes como autónomo sin gastos, necesitas facturar aproximadamente 3.400-3.600€/mes (sin IVA). Esta cifra incluye la cuota de Seguridad Social (~360€), el IVA trimestral (modelo 303) y el pago fraccionado del IRPF (modelo 130, 20% sobre beneficio). La cantidad exacta depende de tus gastos deducibles.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo se calcula la facturación necesaria para un autónomo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Se calcula de forma inversa al beneficio neto: partiendo del sueldo deseado, se suman la cuota de Seguridad Social según el tramo correspondiente, el IVA trimestral neto (21% sobre la diferencia entre ingresos y gastos) y el IRPF trimestral (20% sobre el beneficio). Como la cuota depende del rendimiento neto y este de la facturación, se necesita un cálculo iterativo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Un nuevo autónomo con tarifa plana necesita facturar menos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, significativamente menos. Con la tarifa plana de 80€/mes (88,64€ con MEI) frente a cuotas normales de 200-530€/mes, un nuevo autónomo necesita facturar entre 100€ y 400€ menos al mes para obtener el mismo beneficio neto, dependiendo del tramo que le correspondería sin tarifa plana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué gastos puedo deducir para reducir la facturación necesaria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes deducir todos los gastos directamente relacionados con tu actividad: alquiler de oficina, suministros (porcentaje si trabajas desde casa), material, herramientas, software, teléfono, internet, formación, seguros profesionales, cuotas colegiales, y gastos de vehículo si es necesario para tu trabajo. Además, se aplica automáticamente una deducción del 7% por gastos de difícil justificación.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora Facturación Necesaria Autónomos",
  url: `${SITE_URL}/facturacion`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  description:
    "Calcula cuánto necesitas facturar para conseguir el sueldo neto que deseas como autónomo en España.",
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
      name: "Calculadora Facturación Necesaria",
      item: `${SITE_URL}/facturacion`,
    },
  ],
};

export default function FacturacionPage() {
  const [beneficio, setBeneficio] = useState("");
  const [gastos, setGastos] = useState("");
  const [nuevoAutonomo, setNuevoAutonomo] = useState(false);
  const [societario, setSocietario] = useState(false);
  const [resultado, setResultado] = useState<ResultadoFacturacion | null>(null);

  function calcular() {
    const b = parseFloat(beneficio);
    const g = parseFloat(gastos) || 0;
    if (!b || b <= 0) return;
    setResultado(calcularFacturacionNecesaria(b, g, { nuevoAutonomo, societario }));
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-medium mb-3">
          Calculadora inversa
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          ¿Cuánto necesito facturar?
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Introduce el sueldo neto que quieres llevarte y te decimos cuánto debes facturar.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Beneficio neto mensual deseado
            <span className="text-slate-400 font-normal"> (lo que quieres llevarte limpio)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={beneficio}
              onChange={(e) => setBeneficio(e.target.value)}
              placeholder="2.000"
              className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none"
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Gastos mensuales estimados
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
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all text-base cursor-pointer shadow-sm shadow-cyan-200 active:scale-[0.98]"
        >
          Calcular facturación necesaria
        </button>
      </div>

      {/* Results */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Facturación mensual necesaria" value={fmt(resultado.facturacionMensual)} sublabel="Sin IVA" highlight />
            <ResultCard label="Facturación anual necesaria" value={fmt(resultado.facturacionAnual)} sublabel="Sin IVA" highlight />
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
        <h2 className="text-2xl font-bold text-slate-900">Cómo calcular cuánto necesitas facturar como autónomo en 2026</h2>

        <p className="text-slate-600 leading-relaxed">
          Una de las preguntas más habituales cuando alguien se plantea hacerse autónomo es: <strong>¿cuánto tengo que facturar para ganar X al mes?</strong> La respuesta no es simplemente sumar impuestos al sueldo deseado, porque la cuota de la Seguridad Social depende del rendimiento neto, que a su vez depende de la facturación. Es un cálculo circular que requiere iteración.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">La lógica inversa: del sueldo a la factura</h3>

        <p className="text-slate-600 leading-relaxed">
          Nuestra calculadora trabaja de forma inversa a la calculadora de beneficio neto. Parte del sueldo que quieres llevarte limpio cada mes y calcula hacia atrás: suma los gastos fijos, la cuota de autónomos correspondiente a tu tramo, el IVA trimestral neto (modelo 303) y el pago fraccionado del IRPF (modelo 130). El resultado es la <strong>facturación mínima mensual sin IVA</strong> que necesitas alcanzar para cubrir todos los costes y quedarte con tu objetivo.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">¿Por qué varía tanto la cifra?</h3>

        <p className="text-slate-600 leading-relaxed">
          La diferencia entre lo que facturas y lo que te llevas limpio puede ser enorme. Para un autónomo sin gastos que quiere ganar 2.000€ netos, la facturación necesaria puede superar los 3.500€/mes. Esto se debe a que sobre cada euro facturado se acumulan tres cargas: la cuota de la Seguridad Social (entre 200€ y 530€/mes según tu tramo), el IVA que recaudas pero debes ingresar a Hacienda, y el 20% de IRPF trimestral. <strong>Los gastos deducibles reducen la facturación necesaria</strong> porque disminuyen el rendimiento neto y, por tanto, pueden bajarte de tramo de cotización.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Consejos para reducir la facturación necesaria</h3>

        <p className="text-slate-600 leading-relaxed">
          La clave está en maximizar los gastos deducibles legítimos: alquiler de espacio de trabajo, suministros, material profesional, formación, seguros y herramientas digitales. Cada euro de gasto deducible reduce tu rendimiento neto y puede situarte en un tramo inferior de cotización. Si eres <strong>nuevo autónomo</strong>, la tarifa plana de 80€/mes (88,64€ con MEI) durante el primer año supone un ahorro de entre 100€ y 450€ mensuales respecto a la cuota normal, lo que reduce significativamente la facturación mínima necesaria.
        </p>
      </section>
    </div>
  );
}
