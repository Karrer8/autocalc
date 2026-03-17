"use client";

import { useState } from "react";
import { calcularTarifa, type ResultadoTarifa } from "@/lib/calculadora";
import ResultCard from "@/components/ResultCard";
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
      name: "¿Cuánto debe cobrar por hora un autónomo en España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del salario neto que desees alcanzar. Como referencia, para un salario neto de 2.000€/mes trabajando 40h/semana, la tarifa mínima ronda los 25-30€/hora. Esto cubre cuota de Seguridad Social, IRPF y tiene en cuenta que solo el 65% de tu tiempo es facturable (el resto va a admin, ventas, formación).",
      },
    },
    {
      "@type": "Question",
      name: "¿Por qué no puedo cobrar solo el salario que quiero dividido entre horas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Porque como autónomo debes cubrir la cuota de Seguridad Social (200-530€/mes), el IRPF (aproximadamente 20% de tu beneficio), y tener en cuenta que no todas tus horas de trabajo son facturables. Se estima que solo el 60-70% del tiempo es facturable; el resto se dedica a tareas administrativas, comerciales y formación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué porcentaje de mi tiempo como freelance es facturable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La estimación conservadora es que entre el 60% y el 70% de tu tiempo de trabajo es facturable. El resto se dedica a tareas no facturables pero necesarias: gestión administrativa, contabilidad, prospección comercial, reuniones no facturables, formación y desplazamientos. Nuestra calculadora usa un 65% como referencia.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora Tarifa Horaria Autónomo",
  url: `${SITE_URL}/tarifa`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Calcula la tarifa horaria mínima que necesitas cobrar como autónomo o freelance en España.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AutoCalc", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Calculadora Tarifa Horaria", item: `${SITE_URL}/tarifa` },
  ],
};

export default function TarifaPage() {
  const [salario, setSalario] = useState("");
  const [horas, setHoras] = useState("40");
  const [vacaciones, setVacaciones] = useState("22");
  const [resultado, setResultado] = useState<ResultadoTarifa | null>(null);

  function calcular() {
    const s = parseFloat(salario);
    const h = parseFloat(horas) || 40;
    const v = parseFloat(vacaciones) || 22;
    if (!s || s <= 0) return;
    setResultado(calcularTarifa(s, h, v));
  }

  const donutData = resultado
    ? [
        { name: "Salario neto", value: resultado.desglose.beneficioDeseado, color: "#10b981" },
        { name: "Cuota SS", value: resultado.desglose.cuotaSS, color: "#3b82f6" },
        { name: "IRPF", value: resultado.desglose.irpf, color: "#f43f5e" },
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium mb-3">
          Freelance / autónomo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          ¿Cuánto cobrar por hora?
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Calcula tu tarifa horaria mínima para cubrir impuestos y alcanzar el salario neto que deseas.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Salario neto mensual deseado</label>
          <div className="relative">
            <input type="number" inputMode="decimal" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder="2.000" className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-lg text-slate-900 placeholder:text-slate-300 transition-all outline-none" />
            <span className="absolute right-4 top-3.5 text-slate-400 text-lg font-medium">€</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Horas/semana</label>
            <input type="number" inputMode="decimal" value={horas} onChange={(e) => setHoras(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Vacaciones/año <span className="text-slate-400 font-normal">(días)</span></label>
            <input type="number" inputMode="decimal" value={vacaciones} onChange={(e) => setVacaciones(e.target.value)} className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900 transition-all outline-none" />
          </div>
        </div>

        <button onClick={calcular} className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-violet-700 transition-all text-base cursor-pointer shadow-sm shadow-violet-200 active:scale-[0.98]">
          Calcular tarifa horaria
        </button>
      </div>

      {/* Results */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Tarifa mínima por hora" value={fmt(resultado.tarifaMinima) + "/h"} highlight />
            <ResultCard label="Tarifa recomendada (+20%)" value={fmt(resultado.tarifaRecomendada) + "/h"} highlight />
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">¿A dónde va lo que facturas?</h3>
            <DonutChart data={donutData} centerLabel="Total/mes" centerValue={fmt(resultado.desglose.total)} />
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Desglose mensual</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600">Salario neto deseado</span>
                </div>
                <span className="font-medium text-slate-900 tabular-nums">{fmt(resultado.desglose.beneficioDeseado)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  <span className="text-slate-600">Cuota Seguridad Social</span>
                </div>
                <span className="font-medium text-slate-900 tabular-nums">{fmt(resultado.desglose.cuotaSS)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-600">IRPF estimado (20%)</span>
                </div>
                <span className="font-medium text-slate-900 tabular-nums">{fmt(resultado.desglose.irpf)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-900">Total a facturar/mes</span>
                <span className="font-bold text-slate-900 tabular-nums">{fmt(resultado.desglose.total)}</span>
              </div>
            </div>
          </div>

          <ResultCard label="Horas facturables al mes" value={resultado.horasFacturablesMes.toFixed(0) + "h"} sublabel="65% del tiempo total (admin, ventas, formación no cuentan)" />
        </div>
      )}

      <Disclaimer />

      {/* SEO Content */}
      <section className="mt-16 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Cómo calcular tu tarifa horaria como autónomo o freelance</h2>

        <p className="text-slate-600 leading-relaxed">
          Uno de los errores más comunes al empezar como autónomo o freelance es <strong>calcular la tarifa horaria simplemente dividiendo el salario deseado entre las horas de trabajo</strong>. Esta aproximación ignora tres factores críticos: los impuestos, la cuota de Seguridad Social y el tiempo no facturable. El resultado es que muchos autónomos acaban cobrando menos de lo que necesitan.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">La fórmula de la tarifa mínima viable</h3>

        <p className="text-slate-600 leading-relaxed">
          La tarifa horaria mínima se calcula dividiendo tus costes mensuales totales entre las horas realmente facturables. Los costes incluyen: tu <strong>salario neto deseado</strong>, la <strong>cuota de Seguridad Social</strong> (que depende de tu tramo) y una estimación del <strong>IRPF</strong> (aproximadamente el 20% de tu beneficio como pago fraccionado trimestral). Si además tienes gastos fijos del negocio (coworking, herramientas, seguros), también debes sumarlos.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">¿Por qué solo el 65% del tiempo es facturable?</h3>

        <p className="text-slate-600 leading-relaxed">
          Como autónomo, no puedes facturar el 100% de tu jornada laboral. Hay una parte significativa de tu tiempo que se dedica a tareas necesarias pero no facturables: <strong>gestión administrativa y contabilidad</strong> (facturas, declaraciones trimestrales, bancos), <strong>prospección comercial</strong> (buscar nuevos clientes, preparar propuestas), <strong>formación</strong> (mantenerte actualizado en tu sector) y <strong>reuniones no productivas</strong>. La estimación conservadora es que entre un 60% y un 70% de tu tiempo es facturable. Nuestra calculadora usa un 65%.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Tarifa mínima vs. tarifa recomendada</h3>

        <p className="text-slate-600 leading-relaxed">
          La tarifa mínima es el suelo: lo mínimo que necesitas cobrar para cubrir todos tus costes y alcanzar el salario neto deseado. Sin embargo, recomendamos <strong>añadir al menos un 20% de margen</strong> para cubrir imprevistos: meses con menos trabajo, impagos, gastos inesperados, periodos de baja o simplemente para generar un colchón de ahorro. Ese 20% adicional es la diferencia entre sobrevivir y construir un negocio sostenible como autónomo.
        </p>

        <h3 className="text-xl font-semibold text-slate-800">Las vacaciones también cuentan</h3>

        <p className="text-slate-600 leading-relaxed">
          A diferencia de un empleado por cuenta ajena, como autónomo <strong>las vacaciones no son remuneradas</strong>. Si te tomas 22 días laborables de vacaciones al año (equivalente a un empleado), son aproximadamente 4,4 semanas sin facturar. Esto reduce tus semanas facturables de 52 a unas 47,6 al año. Nuestra calculadora incorpora este factor: cuantos más días de vacaciones, mayor debe ser tu tarifa horaria para compensar.
        </p>
      </section>
    </div>
  );
}
