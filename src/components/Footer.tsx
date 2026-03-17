import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-600 to-brand-800 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700">AutoCalc</span>
          </div>
          <nav className="flex gap-4 text-sm text-slate-400">
            <Link href="/beneficio" className="hover:text-slate-600 transition-colors">Beneficio</Link>
            <Link href="/cuota" className="hover:text-slate-600 transition-colors">Tramos</Link>
            <Link href="/tarifa" className="hover:text-slate-600 transition-colors">Tarifa</Link>
            <Link href="/factura" className="hover:text-slate-600 transition-colors">Factura</Link>
          </nav>
        </div>
        <p className="text-xs text-slate-400 text-center mt-6 max-w-lg mx-auto leading-relaxed">
          Esta herramienta proporciona estimaciones orientativas basadas en la
          normativa fiscal vigente. No constituye asesoramiento fiscal
          profesional. Consulta siempre con un asesor fiscal cualificado.
        </p>
        <p className="text-xs text-slate-300 text-center mt-3">
          Datos fiscales actualizados a 2026
        </p>
      </div>
    </footer>
  );
}
