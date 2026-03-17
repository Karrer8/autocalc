import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const calculadoras = [
  {
    href: "/beneficio",
    title: "¿Cuánto me queda limpio?",
    description: "Introduce tu facturación y gastos y descubre tu beneficio neto real tras cuota, IVA e IRPF.",
    gradient: "from-emerald-500 to-emerald-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    href: "/cuota",
    title: "¿En qué tramo estoy?",
    description: "Calcula tu tramo de cotización según tus ingresos. Tabla completa de 15 tramos 2026.",
    gradient: "from-brand-500 to-brand-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    href: "/tarifa",
    title: "¿Cuánto cobrar por hora?",
    description: "Descubre la tarifa horaria mínima para cubrir impuestos y alcanzar tu salario deseado.",
    gradient: "from-violet-500 to-violet-600",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    href: "/factura",
    title: "Simulador de factura",
    description: "Calcula el IVA, retención IRPF y total de tu factura al instante.",
    gradient: "from-amber-500 to-orange-500",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "15", label: "Tramos de cotización" },
  { value: "200-530€", label: "Rango cuotas/mes" },
  { value: "88,64€", label: "Tarifa plana + MEI" },
  { value: "31,3%", label: "Tipo cotización" },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AutoCalc",
  url: SITE_URL,
  description:
    "Suite de calculadoras gratuitas para autónomos en España: beneficio neto, cuota por tramos, tarifa horaria y simulador de factura.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AutoCalc",
  url: SITE_URL,
  description:
    "Calculadoras fiscales gratuitas para autónomos en España. Datos actualizados 2026.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AutoCalc", item: SITE_URL },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Datos fiscales 2026 actualizados
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
              Todas las calculadoras
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">
                {" "}para autónomos
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
              Un solo input, todos los outputs. Cuota SS, IVA, IRPF y beneficio
              neto real. Gratis, sin registro.
            </p>
          </div>
        </div>
      </section>

      {/* Calculadoras grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {calculadoras.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.gradient} text-white flex items-center justify-center mb-4`}>
                {calc.icon}
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-brand-700 transition-colors">
                {calc.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
              <div className="absolute top-6 right-6 text-slate-300 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-slate-900 mb-5 text-center sm:text-left">
            Datos clave 2026
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-600 tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            ¿Cuánto te queda limpio?
          </h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Es la pregunta que todo autónomo se hace. Descúbrelo en 10 segundos.
          </p>
          <Link
            href="/beneficio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
          >
            Calcular ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900">Calculadoras fiscales para autónomos en España: todo en un solo sitio</h2>

          <p className="text-slate-600 leading-relaxed">
            AutoCalc nace para resolver un problema común: <strong>los autónomos en España necesitan visitar 3 o 4 webs diferentes</strong> para saber cuánto les queda limpio de lo que facturan. El sistema de cotización por ingresos reales, vigente desde 2023 con sus 15 tramos, el IVA trimestral y el IRPF hacen que calcular el beneficio neto real sea una tarea compleja. Con AutoCalc, introduces un solo dato y obtienes todos los resultados.
          </p>

          <h3 className="text-xl font-semibold text-slate-800">¿Qué calculadoras incluye AutoCalc?</h3>

          <p className="text-slate-600 leading-relaxed">
            Nuestra suite incluye cuatro calculadoras diseñadas para cubrir las necesidades más frecuentes de los más de 3,4 millones de autónomos en España. La <strong>calculadora de beneficio neto</strong> te muestra cuánto te queda limpio tras cuota, IVA e IRPF. El <strong>simulador de tramos</strong> te dice en qué tramo de cotización estás y cuánto pagas, con la tabla completa de 15 tramos actualizada a 2026. La <strong>calculadora de tarifa horaria</strong> te ayuda a fijar un precio por hora que cubra todos tus costes. Y el <strong>simulador de factura</strong> te muestra el desglose exacto de IVA y retención IRPF.
          </p>

          <h3 className="text-xl font-semibold text-slate-800">Datos fiscales 2026 actualizados</h3>

          <p className="text-slate-600 leading-relaxed">
            Todas las calculadoras utilizan los datos fiscales oficiales de 2026. Las cuotas de autónomos permanecen congeladas respecto a 2025 según el Real Decreto-ley 16/2025, con cuotas desde 200€ hasta 530€ mensuales. El MEI sube al 0,9%, la tarifa plana se mantiene en 80€/mes (88,64€ con MEI) para nuevos autónomos, y los tipos de IRPF y retenciones siguen siendo los mismos. Actualizamos los datos cada enero para reflejar los cambios normativos del nuevo ejercicio fiscal.
          </p>

          <h3 className="text-xl font-semibold text-slate-800">Gratis, sin registro, sin trucos</h3>

          <p className="text-slate-600 leading-relaxed">
            AutoCalc es completamente gratuito y no requiere registro. No guardamos tus datos, no pedimos tu email y no hay versión de pago oculta. Las calculadoras funcionan al instante en tu navegador, tanto en móvil como en escritorio. Nuestro objetivo es ser la herramienta de referencia que todo autónomo español tiene en favoritos para resolver la eterna pregunta: ¿cuánto me queda limpio?
          </p>
        </div>
      </section>
    </>
  );
}
