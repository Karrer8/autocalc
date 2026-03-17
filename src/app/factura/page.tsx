"use client";

import { useState } from "react";
import { calcularFactura, type ResultadoFactura } from "@/lib/calculadora";
import { IVA_GENERAL, IVA_REDUCIDO, IVA_SUPERREDUCIDO } from "@/lib/datos-fiscales";
import Disclaimer from "@/components/Disclaimer";
import DonutChart from "@/components/DonutChart";
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
      name: "¿Qué retención IRPF debo aplicar en mis facturas como autónomo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La retención general de IRPF para actividades profesionales es del 15%. Los nuevos autónomos pueden aplicar una retención reducida del 7% durante el año de alta y los dos siguientes. Las actividades agrícolas y ganaderas aplican un 2%. No todas las facturas llevan retención: solo las emitidas a empresas o profesionales por actividades que la requieran.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuántos tipos de IVA hay en España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En España hay tres tipos de IVA: general (21%, aplica a la mayoría de servicios y productos), reducido (10%, para hostelería, transporte, reformas de vivienda) y superreducido (4%, para alimentos básicos, libros, medicamentos). Además, algunas actividades están exentas de IVA: sanitarias, educativas, seguros y servicios financieros.",
      },
    },
    {
      "@type": "Question",
      name: "¿La retención del IRPF es dinero que pierdo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. La retención de IRPF que te practica el cliente es un pago a cuenta de tu declaración de la renta anual. Tu cliente ingresa ese porcentaje directamente a Hacienda en tu nombre. Cuando hagas la declaración de la renta, esas retenciones se descuentan del total de IRPF que debes pagar. Si las retenciones superan tu cuota, Hacienda te devuelve la diferencia.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es la diferencia entre el total de la factura y lo que cobro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El total de la factura es la base imponible más el IVA. Lo que realmente cobras (lo que entra en tu cuenta) es el total de la factura menos la retención de IRPF, si aplica. Por ejemplo, en una factura de 1.000€ + 210€ de IVA - 150€ de retención IRPF, el total factura es 1.210€ pero cobras 1.060€.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulador de Factura para Autónomos",
  url: `${SITE_URL}/factura`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Simula tu factura como autónomo: calcula IVA, retención IRPF y el total que cobras.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AutoCalc", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Simulador de Factura", item: `${SITE_URL}/factura` },
  ],
};

export default function FacturaPage() {
  const [importe, setImporte] = useState("");
  const [tipoIva, setTipoIva] = useState(IVA_GENERAL.toString());
  const [aplicarRetencion, setAplicarRetencion] = useState(true);
  const [nuevoAutonomo, setNuevoAutonomo] = useState(false);
  const [resultado, setResultado] = useState<ResultadoFactura | null>(null);

  function calcular() {
    const i = parseFloat(importe);
    if (!i || i <= 0) return;
    setResultado(
      calcularFactura(i, {
        tipoIva: parseFloat(tipoIva),
        aplicarRetencion,
        nuevoAutonomo,
      })
    );
  }

  const donutData = resultado
    ? [
        { name: "Base imponible", value: resultado.importeBase, color: "#10b981" },
        { name: "IVA", value: resultado.iva, color: "#f59e0b" },
        ...(resultado.retencionIRPF > 0
          ? [{ name: "Retención IRPF", value: resultado.retencionIRPF, color: "#f43f5e" }]
          : []),
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium mb-3">
          IVA + IRPF
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Simulador de factura
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Calcula el IVA, la retención IRPF y el total de tu factura al instante.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Importe base <span className="text-slate-400 font-normal">(sin IVA)</span>
          </label>
          <div className="relative">
            <input type="number" inputMode="decimal" value={importe} onChange={(e) => setImporte(e.target.value)} placeholder="1.000" className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none" />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Tipo de IVA</label>
          <select value={tipoIva} onChange={(e) => setTipoIva(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 transition-all outline-none bg-white appearance-none cursor-pointer">
            <option value={IVA_GENERAL}>21% — General</option>
            <option value={IVA_REDUCIDO}>10% — Reducido</option>
            <option value={IVA_SUPERREDUCIDO}>4% — Superreducido</option>
            <option value="0">0% — Exento</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" checked={aplicarRetencion} onChange={(e) => setAplicarRetencion(e.target.checked)} className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500/20" />
            <span className="text-sm text-slate-600">Aplicar retención IRPF</span>
          </label>
          {aplicarRetencion && (
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" checked={nuevoAutonomo} onChange={(e) => setNuevoAutonomo(e.target.checked)} className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500/20" />
              <span className="text-sm text-slate-600">Nuevo autónomo (7%)</span>
            </label>
          )}
        </div>

        <button onClick={calcular} className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all text-base cursor-pointer shadow-sm shadow-amber-200 active:scale-[0.98]">
          Simular factura
        </button>
      </div>

      {/* Results */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 sm:px-6 py-4">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Vista previa de factura</p>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Base imponible</span>
                <span className="font-semibold text-slate-900 tabular-nums">{fmt(resultado.importeBase)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">+ IVA ({(resultado.tipoIva * 100).toFixed(0)}%)</span>
                <span className="font-semibold text-amber-600 tabular-nums">+{fmt(resultado.iva)}</span>
              </div>
              {resultado.tipoRetencion > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">- Retención IRPF ({(resultado.tipoRetencion * 100).toFixed(0)}%)</span>
                  <span className="font-semibold text-rose-500 tabular-nums">-{fmt(resultado.retencionIRPF)}</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <span className="font-semibold text-slate-900">Total factura</span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">{fmt(resultado.totalFactura)}</span>
              </div>
              <div className="bg-emerald-50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 px-5 sm:px-6 py-4 flex justify-between items-center">
                <span className="font-medium text-emerald-800 text-sm">Lo que recibes en tu cuenta</span>
                <span className="text-xl font-bold text-emerald-700 tabular-nums">{fmt(resultado.totalIngresa)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Composición de la factura</h3>
            <DonutChart data={donutData} centerLabel="Total" centerValue={fmt(resultado.totalFactura)} />
          </div>

          {resultado.tipoRetencion > 0 && (
            <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 text-sm text-brand-700 leading-relaxed">
              <strong>Sobre la retención:</strong> Los {fmt(resultado.retencionIRPF)} que te retiene el cliente se descuentan de tu declaración de IRPF anual. Es un pago a cuenta, no dinero perdido.
            </div>
          )}
        </div>
      )}

      <Disclaimer />

      {/* SEO Content */}
      <section className="mt-16 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Cómo funciona una factura de autónomo en España</h2>

        <p className="text-slate-600 leading-relaxed">
          Las facturas de autónomos en España tienen una estructura específica que todo trabajador por cuenta propia debe conocer. El <strong>importe base</strong> (o base imponible) es la cantidad que cobras por tu servicio o producto, sin impuestos. Sobre esa base se aplican dos conceptos fiscales principales: el IVA que sumas y la retención de IRPF que restas.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">El IVA en las facturas de autónomos</h3>

        <p className="text-slate-600 leading-relaxed">
          El <strong>Impuesto sobre el Valor Añadido (IVA)</strong> se suma al importe base de tu factura. El tipo más habitual es el 21% (general), pero existen el tipo reducido del 10% (hostelería, transporte, reformas) y el superreducido del 4% (alimentos básicos, libros). Algunas actividades están exentas de IVA: sanitarias, educativas, artísticas en determinados supuestos y servicios financieros. El IVA que cobras a tus clientes no es un ingreso tuyo: lo recaudas para Hacienda y lo liquidas trimestralmente con el modelo 303.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">La retención de IRPF: qué es y cuándo aplica</h3>

        <p className="text-slate-600 leading-relaxed">
          La <strong>retención de IRPF</strong> es un porcentaje que el cliente descuenta de tu factura y lo ingresa directamente a Hacienda en tu nombre. No todas las facturas llevan retención: generalmente solo las emitidas a empresas o profesionales por actividades profesionales, artísticas o de propiedad intelectual. La retención general es del <strong>15%</strong>, pero los nuevos autónomos disfrutan de un tipo reducido del <strong>7%</strong> durante el año de alta y los dos siguientes. Las actividades agrícolas aplican un 2%.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Total factura vs. total que cobras</h3>

        <p className="text-slate-600 leading-relaxed">
          Es fundamental distinguir entre el <strong>total de la factura</strong> y lo que realmente <strong>ingresa en tu cuenta bancaria</strong>. El total de la factura es la base más el IVA (lo que el cliente debe en total). Lo que tú cobras es ese total menos la retención de IRPF. Por ejemplo, con una base de 1.000€: sumas 210€ de IVA (21%) y restas 150€ de retención IRPF (15%). El total factura es 1.210€, pero en tu cuenta entran 1.060€. Los 150€ restantes los ingresa tu cliente a Hacienda y se descuentan de tu IRPF anual.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">¿Cuándo no se aplica retención?</h3>

        <p className="text-slate-600 leading-relaxed">
          No todas las facturas de autónomos llevan retención. Si facturas a particulares, a clientes extranjeros o si tu actividad está en estimación objetiva (módulos), generalmente no aplicas retención. Tampoco la llevan las facturas de venta de productos (solo servicios profesionales). En estos casos, el total que cobras es simplemente la base más el IVA. Si tienes dudas sobre si tu actividad requiere retención, consulta con tu asesor fiscal.
        </p>
      </section>
    </div>
  );
}
